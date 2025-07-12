<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\UserPreference;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    public function index(Request $request)
    {
        $preferences = $request->user()->preferences;
        
        return response()->json([
            'data' => $preferences
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'ecological_priority' => 'required|integer|min:0|max:100',
            'budget_range' => 'required|array|size:2',
            'budget_range.0' => 'required|numeric|min:0',
            'budget_range.1' => 'required|numeric|min:0|gt:budget_range.0',
            'expertise_level' => 'required|in:beginner,intermediate,advanced',
            'interests' => 'nullable|array',
            'excluded_categories' => 'nullable|array'
        ]);

        $preferences = $request->user()->preferences()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $validated
        );

        return response()->json([
            'message' => 'Preferences updated successfully',
            'data' => $preferences
        ]);
    }
} 