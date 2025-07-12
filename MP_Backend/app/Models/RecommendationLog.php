<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecommendationLog extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'recommendation_type',
        'interaction_result',
        'recommendation_context',
        'user_context'
    ];

    protected $casts = [
        'recommendation_context' => 'array',
        'user_context' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
} 