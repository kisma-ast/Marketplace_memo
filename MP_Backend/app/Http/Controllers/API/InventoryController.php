<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\UserInventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $inventory = $request->user()->inventory()
            ->with('product')
            ->latest()
            ->get();
        
        return response()->json([
            'data' => $inventory
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'purchase_date' => 'required|date',
            'usage_frequency' => 'required|in:daily,weekly,monthly,yearly,rarely',
            'condition' => 'required|in:new,good,fair,poor',
            'usage_notes' => 'nullable|array'
        ]);

        $inventory = $request->user()->inventory()->create($validated);

        return response()->json([
            'message' => 'Item added to inventory successfully',
            'data' => $inventory
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'usage_frequency' => 'sometimes|in:daily,weekly,monthly,yearly,rarely',
            'condition' => 'sometimes|in:new,good,fair,poor',
            'last_maintenance_date' => 'nullable|date',
            'next_maintenance_date' => 'nullable|date',
            'usage_notes' => 'nullable|array'
        ]);

        $inventory = $request->user()->inventory()->findOrFail($id);
        $inventory->update($validated);

        return response()->json([
            'message' => 'Inventory item updated successfully',
            'data' => $inventory
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $inventory = $request->user()->inventory()->findOrFail($id);
        $inventory->delete();

        return response()->json([
            'message' => 'Item removed from inventory successfully'
        ]);
    }
} 