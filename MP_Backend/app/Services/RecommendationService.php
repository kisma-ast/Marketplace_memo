<?php

namespace App\Services;

use App\Models\User;
use App\Models\Product;
use App\Models\UserInventory;
use App\Models\ProductRelationship;
use Illuminate\Support\Collection;

class RecommendationService
{
    public function getResponsibleRecommendations(User $user)
    {
        $inventory = $user->inventory;
        $preferences = $user->preferences;

        return [
            'alternatives' => $this->findAlternatives($inventory),
            'complementary' => $this->findComplementaryProducts($inventory),
            'ecological' => $this->findEcologicalOptions($preferences)
        ];
    }

    public function getLifecycleRecommendations(User $user)
    {
        $inventory = $user->inventory;
        $recommendations = [];

        foreach ($inventory as $item) {
            if ($this->needsMaintenance($item)) {
                $recommendations['maintenance'][] = [
                    'product' => $item->product,
                    'maintenance_type' => 'routine',
                    'urgency' => 'high'
                ];
            }

            if ($this->needsReplacement($item)) {
                $recommendations['replacement'][] = [
                    'product' => $item->product,
                    'replacement_options' => $this->findReplacementOptions($item)
                ];
            }
        }

        return $recommendations;
    }

    public function getProgressiveRecommendations(User $user)
    {
        $preferences = $user->preferences;
        $expertiseLevel = $preferences->expertise_level;

        return [
            'current_stage' => $this->getCurrentStage($user),
            'next_steps' => $this->getNextSteps($user, $expertiseLevel),
            'long_term_plan' => $this->generateLongTermPlan($user)
        ];
    }

    protected function findAlternatives(Collection $inventory)
    {
        $alternatives = [];
        foreach ($inventory as $item) {
            $relatedProducts = ProductRelationship::where('product_id', $item->product_id)
                ->where('relationship_type', 'alternative')
                ->with('relatedProduct')
                ->get();

            if ($relatedProducts->isNotEmpty()) {
                $alternatives[$item->product_id] = $relatedProducts->pluck('relatedProduct');
            }
        }
        return $alternatives;
    }

    protected function findComplementaryProducts(Collection $inventory)
    {
        $complementary = [];
        foreach ($inventory as $item) {
            $relatedProducts = ProductRelationship::where('product_id', $item->product_id)
                ->where('relationship_type', 'complementary')
                ->with('relatedProduct')
                ->get();

            if ($relatedProducts->isNotEmpty()) {
                $complementary[$item->product_id] = $relatedProducts->pluck('relatedProduct');
            }
        }
        return $complementary;
    }

    protected function findEcologicalOptions($preferences)
    {
        return Product::where('ecological_score', '>=', $preferences->ecological_priority)
            ->orderBy('ecological_score', 'desc')
            ->take(10)
            ->get();
    }

    protected function needsMaintenance(UserInventory $item)
    {
        if (!$item->next_maintenance_date) {
            return false;
        }

        return now()->diffInDays($item->next_maintenance_date) <= 30;
    }

    protected function needsReplacement(UserInventory $item)
    {
        $lifecycle = $item->product->lifecycle;
        if (!$lifecycle) {
            return false;
        }

        $ageInMonths = now()->diffInMonths($item->purchase_date);
        return $ageInMonths >= ($lifecycle->average_lifespan * 0.8);
    }

    protected function findReplacementOptions(UserInventory $item)
    {
        return ProductRelationship::where('product_id', $item->product_id)
            ->where('relationship_type', 'upgrade')
            ->with('relatedProduct')
            ->get()
            ->pluck('relatedProduct');
    }

    protected function getCurrentStage(User $user)
    {
        $preferences = $user->preferences;
        $inventory = $user->inventory;

        return [
            'expertise_level' => $preferences->expertise_level,
            'inventory_size' => $inventory->count(),
            'average_product_age' => $inventory->avg(function ($item) {
                return now()->diffInMonths($item->purchase_date);
            })
        ];
    }

    protected function getNextSteps(User $user, string $expertiseLevel)
    {
        $config = config('recommendation.progressive.stages.' . $expertiseLevel);
        
        return [
            'duration' => $config['duration'],
            'recommended_products' => $config['products']
        ];
    }

    protected function generateLongTermPlan(User $user)
    {
        $preferences = $user->preferences;
        $inventory = $user->inventory;

        return [
            'budget_allocation' => $this->calculateBudgetAllocation($preferences),
            'skill_development' => $this->getSkillDevelopmentPath($preferences),
            'inventory_optimization' => $this->getInventoryOptimizationPlan($inventory)
        ];
    }

    protected function calculateBudgetAllocation($preferences)
    {
        $budgetRange = $preferences->budget_range;
        $totalBudget = $budgetRange[1] - $budgetRange[0];

        return [
            'essential_products' => $totalBudget * 0.4,
            'skill_development' => $totalBudget * 0.3,
            'upgrades' => $totalBudget * 0.2,
            'experimentation' => $totalBudget * 0.1
        ];
    }

    protected function getSkillDevelopmentPath($preferences)
    {
        $currentLevel = $preferences->expertise_level;
        $nextLevel = $this->getNextExpertiseLevel($currentLevel);

        return [
            'current_level' => $currentLevel,
            'next_level' => $nextLevel,
            'required_skills' => $this->getRequiredSkills($nextLevel),
            'estimated_time' => $this->getEstimatedTimeToNextLevel($currentLevel)
        ];
    }

    protected function getInventoryOptimizationPlan(Collection $inventory)
    {
        return [
            'maintenance_schedule' => $this->generateMaintenanceSchedule($inventory),
            'replacement_schedule' => $this->generateReplacementSchedule($inventory),
            'optimization_suggestions' => $this->getOptimizationSuggestions($inventory)
        ];
    }

    protected function getNextExpertiseLevel(string $currentLevel)
    {
        $levels = ['beginner', 'intermediate', 'advanced'];
        $currentIndex = array_search($currentLevel, $levels);
        return $levels[min($currentIndex + 1, count($levels) - 1)];
    }

    protected function getRequiredSkills(string $level)
    {
        // This would typically come from a configuration or database
        return [
            'beginner' => ['basic_usage', 'maintenance'],
            'intermediate' => ['advanced_usage', 'troubleshooting'],
            'advanced' => ['expert_usage', 'optimization']
        ][$level] ?? [];
    }

    protected function getEstimatedTimeToNextLevel(string $currentLevel)
    {
        // This would typically be calculated based on user activity and progress
        return [
            'beginner' => 3,
            'intermediate' => 6,
            'advanced' => 12
        ][$currentLevel] ?? 0;
    }

    protected function generateMaintenanceSchedule(Collection $inventory)
    {
        return $inventory->map(function ($item) {
            return [
                'product' => $item->product,
                'next_maintenance' => $item->next_maintenance_date,
                'maintenance_type' => 'routine'
            ];
        });
    }

    protected function generateReplacementSchedule(Collection $inventory)
    {
        return $inventory->map(function ($item) {
            return [
                'product' => $item->product,
                'estimated_replacement_date' => $this->calculateReplacementDate($item),
                'replacement_priority' => $this->calculateReplacementPriority($item)
            ];
        });
    }

    protected function getOptimizationSuggestions(Collection $inventory)
    {
        return $inventory->map(function ($item) {
            return [
                'product' => $item->product,
                'suggestions' => $this->generateProductSpecificSuggestions($item)
            ];
        });
    }

    protected function calculateReplacementDate(UserInventory $item)
    {
        $lifecycle = $item->product->lifecycle;
        if (!$lifecycle) {
            return null;
        }

        return $item->purchase_date->addMonths($lifecycle->average_lifespan);
    }

    protected function calculateReplacementPriority(UserInventory $item)
    {
        $ageInMonths = now()->diffInMonths($item->purchase_date);
        $lifecycle = $item->product->lifecycle;
        
        if (!$lifecycle) {
            return 'low';
        }

        $agePercentage = $ageInMonths / $lifecycle->average_lifespan;
        
        if ($agePercentage >= 0.9) return 'high';
        if ($agePercentage >= 0.7) return 'medium';
        return 'low';
    }

    protected function generateProductSpecificSuggestions(UserInventory $item)
    {
        $suggestions = [];
        
        if ($item->condition === 'poor') {
            $suggestions[] = 'Consider replacement due to poor condition';
        }
        
        if ($item->usage_frequency === 'rarely') {
            $suggestions[] = 'Consider selling or donating due to low usage';
        }
        
        return $suggestions;
    }
} 