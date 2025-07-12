<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductRelationship extends Model
{
    protected $fillable = [
        'product_id',
        'related_product_id',
        'relationship_type',
        'compatibility_score',
        'relationship_metadata'
    ];

    protected $casts = [
        'relationship_metadata' => 'array'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function relatedProduct()
    {
        return $this->belongsTo(Product::class, 'related_product_id');
    }
} 