<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ConversationHistory;
use App\Services\NLPService;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    protected $nlpService;

    public function __construct(NLPService $nlpService)
    {
        $this->nlpService = $nlpService;
    }

    public function process(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string'
        ]);

        $user = $request->user();
        
        // Process the message using NLP
        $intent = $this->nlpService->extractIntent($validated['message']);
        $entities = $this->nlpService->extractEntities($validated['message']);
        $sentiment = $this->nlpService->analyzeSentiment($validated['message']);
        
        // Get recommendations based on the conversation
        $recommendations = $this->nlpService->getRecommendations($intent, $entities, $user);
        
        // Log the conversation
        $conversation = ConversationHistory::create([
            'user_id' => $user->id,
            'message' => $validated['message'],
            'intent' => $intent,
            'entities' => $entities,
            'sentiment' => $sentiment,
            'recommendations' => $recommendations
        ]);

        return response()->json([
            'data' => [
                'conversation' => $conversation,
                'recommendations' => $recommendations
            ]
        ]);
    }

    public function history(Request $request)
    {
        $user = $request->user();
        $conversations = ConversationHistory::where('user_id', $user->id)
            ->latest()
            ->paginate(20);

        return response()->json([
            'data' => $conversations
        ]);
    }
} 