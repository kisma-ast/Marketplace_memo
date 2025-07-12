<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    protected $fillable = [
        'user_id',
        'ecological_priority',
        'budget_range',
        'expertise_level',
        'interests',
        'excluded_categories'
    ];

    protected $casts = [
        'budget_range' => 'array',
        'interests' => 'array',
        'excluded_categories' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 