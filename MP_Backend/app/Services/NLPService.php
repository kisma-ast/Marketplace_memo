<?php

namespace App\Services;

use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Str;

class NLPService
{
    protected $openAI;

    public function __construct()
    {
        // Initialize OpenAI client
        $this->openAI = new \OpenAI\Client([
            'api_key' => config('services.openai.api_key')
        ]);
    }

    public function extractIntent(string $message)
    {
        $response = $this->openAI->chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are an intent classification system. Classify the user message into one of these intents: product_search, product_question, maintenance_question, upgrade_question, general_question'
                ],
                [
                    'role' => 'user',
                    'content' => $message
                ]
            ]
        ]);

        return $response->choices[0]->message->content;
    }

    public function extractEntities(string $message)
    {
        $response = $this->openAI->chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Extract relevant entities from the user message. Return them as a JSON object with categories like product_type, brand, price_range, features, etc.'
                ],
                [
                    'role' => 'user',
                    'content' => $message
                ]
            ]
        ]);

        return json_decode($response->choices[0]->message->content, true);
    }

    public function analyzeSentiment(string $message)
    {
        $response = $this->openAI->chat()->create([
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Analyze the sentiment of the user message. Return a JSON object with sentiment (positive, negative, neutral) and confidence score.'
                ],
                [
                    'role' => 'user',
                    'content' => $message
                ]
            ]
        ]);

        return json_decode($response->choices[0]->message->content, true);
    }

    public function getRecommendations(string $intent, array $entities, User $user)
    {
        $recommendations = [];

        switch ($intent) {
            case 'product_search':
                $recommendations = $this->handleProductSearch($entities, $user);
                break;
            case 'product_question':
                $recommendations = $this->handleProductQuestion($entities, $user);
                break;
            case 'maintenance_question':
                $recommendations = $this->handleMaintenanceQuestion($entities, $user);
                break;
            case 'upgrade_question':
                $recommendations = $this->handleUpgradeQuestion($entities, $user);
                break;
            default:
                $recommendations = $this->handleGeneralQuestion($entities, $user);
        }

        return $recommendations;
    }

    protected function handleProductSearch(array $entities, User $user)
    {
        $query = Product::query();

        if (isset($entities['product_type'])) {
            $query->where('category_id', function ($q) use ($entities) {
                $q->where('name', 'like', '%' . $entities['product_type'] . '%');
            });
        }

        if (isset($entities['price_range'])) {
            $query->whereBetween('price', $entities['price_range']);
        }

        if (isset($entities['features'])) {
            foreach ($entities['features'] as $feature) {
                $query->where('features', 'like', '%' . $feature . '%');
            }
        }

        return $query->take(5)->get();
    }

    protected function handleProductQuestion(array $entities, User $user)
    {
        if (!isset($entities['product_id'])) {
            return [];
        }

        $product = Product::find($entities['product_id']);
        if (!$product) {
            return [];
        }

        return [
            'product' => $product,
            'related_products' => $product->relationships()
                ->where('relationship_type', 'complementary')
                ->with('relatedProduct')
                ->get()
                ->pluck('relatedProduct')
        ];
    }

    protected function handleMaintenanceQuestion(array $entities, User $user)
    {
        $inventory = $user->inventory()
            ->whereHas('product', function ($query) use ($entities) {
                if (isset($entities['product_type'])) {
                    $query->where('category_id', function ($q) use ($entities) {
                        $q->where('name', 'like', '%' . $entities['product_type'] . '%');
                    });
                }
            })
            ->get();

        return $inventory->map(function ($item) {
            return [
                'product' => $item->product,
                'maintenance_schedule' => [
                    'last_maintenance' => $item->last_maintenance_date,
                    'next_maintenance' => $item->next_maintenance_date,
                    'maintenance_requirements' => $item->product->lifecycle->maintenance_requirements ?? []
                ]
            ];
        });
    }

    protected function handleUpgradeQuestion(array $entities, User $user)
    {
        $inventory = $user->inventory()
            ->whereHas('product', function ($query) use ($entities) {
                if (isset($entities['product_type'])) {
                    $query->where('category_id', function ($q) use ($entities) {
                        $q->where('name', 'like', '%' . $entities['product_type'] . '%');
                    });
                }
            })
            ->get();

        return $inventory->map(function ($item) {
            return [
                'current_product' => $item->product,
                'upgrade_options' => $item->product->relationships()
                    ->where('relationship_type', 'upgrade')
                    ->with('relatedProduct')
                    ->get()
                    ->pluck('relatedProduct')
            ];
        });
    }

    protected function handleGeneralQuestion(array $entities, User $user)
    {
        // Handle general questions about products, categories, etc.
        return [
            'categories' => $this->getRelevantCategories($entities),
            'popular_products' => $this->getPopularProducts($entities),
            'trending_products' => $this->getTrendingProducts($entities)
        ];
    }

    protected function getRelevantCategories(array $entities)
    {
        $query = \App\Models\Category::query();

        if (isset($entities['product_type'])) {
            $query->where('name', 'like', '%' . $entities['product_type'] . '%');
        }

        return $query->take(5)->get();
    }

    protected function getPopularProducts(array $entities)
    {
        return Product::withCount('orders')
            ->orderBy('orders_count', 'desc')
            ->take(5)
            ->get();
    }

    protected function getTrendingProducts(array $entities)
    {
        return Product::withCount(['orders' => function ($query) {
                $query->where('created_at', '>=', now()->subDays(7));
            }])
            ->orderBy('orders_count', 'desc')
            ->take(5)
            ->get();
    }
} 