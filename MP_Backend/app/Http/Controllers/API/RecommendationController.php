<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\RecommendationLog;
use App\Services\RecommendationService;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    protected $recommendationService;

    public function __construct(RecommendationService $recommendationService)
    {
        $this->recommendationService = $recommendationService;
    }

    public function getResponsibleRecommendations(Request $request)
    {
        $user = $request->user();
        $recommendations = $this->recommendationService->getResponsibleRecommendations($user);
        
        return response()->json([
            'data' => $recommendations
        ]);
    }

    public function getLifecycleRecommendations(Request $request)
    {
        $user = $request->user();
        $recommendations = $this->recommendationService->getLifecycleRecommendations($user);
        
        return response()->json([
            'data' => $recommendations
        ]);
    }

    public function getProgressiveRecommendations(Request $request)
    {
        $user = $request->user();
        $recommendations = $this->recommendationService->getProgressiveRecommendations($user);
        
        return response()->json([
            'data' => $recommendations
        ]);
    }

    public function logInteraction(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'recommendation_type' => 'required|in:responsible,lifecycle,progressive,conversational',
            'interaction_result' => 'required|in:viewed,clicked,purchased,ignored'
        ]);

        $log = RecommendationLog::create([
            'user_id' => $request->user()->id,
            'product_id' => $validated['product_id'],
            'recommendation_type' => $validated['recommendation_type'],
            'interaction_result' => $validated['interaction_result'],
            'recommendation_context' => $request->input('context'),
            'user_context' => $request->input('user_context')
        ]);

        return response()->json([
            'message' => 'Interaction logged successfully',
            'data' => $log
        ]);
    }
} 