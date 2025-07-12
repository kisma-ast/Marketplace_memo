<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cartItems = CartItem::with('product')
            ->where('user_id', $request->user()->id)
            ->get();
        
        $total = $cartItems->sum(function ($item) {
            return $item->price * $item->quantity;
        });

        return response()->json([
            'data' => $cartItems,
            'total' => $total
        ], 200);
    }

    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product = Product::findOrFail($request->product_id);
        
        if ($product->stock < $request->quantity) {
            return response()->json([
                'message' => 'Not enough stock available'
            ], 422);
        }

        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'product_id' => $request->product_id
            ],
            [
                'quantity' => $request->quantity,
                'price' => $product->price
            ]
        );

        return response()->json(['data' => $cartItem], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $cartItem = CartItem::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $product = Product::findOrFail($cartItem->product_id);
        
        if ($product->stock < $request->quantity) {
            return response()->json([
                'message' => 'Not enough stock available'
            ], 422);
        }

        $cartItem->update([
            'quantity' => $request->quantity
        ]);

        return response()->json(['data' => $cartItem], 200);
    }

    public function remove($id)
    {
        $cartItem = CartItem::where('user_id', request()->user()->id)
            ->findOrFail($id);
        
        $cartItem->delete();
        return response()->json(null, 204);
    }

    public function clear()
    {
        CartItem::where('user_id', request()->user()->id)->delete();
        return response()->json(null, 204);
    }
} 