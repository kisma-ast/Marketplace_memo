<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductLifecycle extends Model
{
    protected $fillable = [
        'product_id',
        'average_lifespan',
        'maintenance_frequency',
        'energy_consumption',
        'maintenance_requirements',
        'upgrade_paths',
        'compatibility_info'
    ];

    protected $casts = [
        'maintenance_requirements' => 'array',
        'upgrade_paths' => 'array',
        'compatibility_info' => 'array'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
} 