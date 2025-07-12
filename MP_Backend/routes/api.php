<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\RecommendationController;
use App\Http\Controllers\API\ConversationController;
use App\Http\Controllers\API\UserPreferenceController;
use App\Http\Controllers\API\InventoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    // Marketplace Routes
    Route::apiResource('products', ProductController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('orders', OrderController::class);

    // Cart Routes
    Route::get('cart', [CartController::class, 'index']);
    Route::post('cart/add', [CartController::class, 'add']);
    Route::put('cart/{id}', [CartController::class, 'update']);
    Route::delete('cart/{id}', [CartController::class, 'remove']);
    Route::delete('cart', [CartController::class, 'clear']);

    // Recommendation System Routes
    Route::prefix('recommendations')->group(function () {
        Route::get('responsible', [RecommendationController::class, 'getResponsibleRecommendations']);
        Route::get('lifecycle', [RecommendationController::class, 'getLifecycleRecommendations']);
        Route::get('progressive', [RecommendationController::class, 'getProgressiveRecommendations']);
        Route::post('log-interaction', [RecommendationController::class, 'logInteraction']);
    });

    // User Preferences Routes
    Route::get('preferences', [UserPreferenceController::class, 'index']);
    Route::put('preferences', [UserPreferenceController::class, 'update']);

    // Inventory Routes
    Route::get('inventory', [InventoryController::class, 'index']);
    Route::post('inventory', [InventoryController::class, 'store']);
    Route::put('inventory/{id}', [InventoryController::class, 'update']);
    Route::delete('inventory/{id}', [InventoryController::class, 'destroy']);

    // Conversation Routes
    Route::post('conversation', [ConversationController::class, 'process']);
    Route::get('conversation/history', [ConversationController::class, 'history']);
}); 