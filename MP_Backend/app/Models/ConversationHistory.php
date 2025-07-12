<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConversationHistory extends Model
{
    protected $table = 'conversation_history';

    protected $fillable = [
        'user_id',
        'message',
        'intent',
        'context',
        'entities',
        'sentiment',
        'recommendations'
    ];

    protected $casts = [
        'context' => 'array',
        'entities' => 'array',
        'sentiment' => 'array',
        'recommendations' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 