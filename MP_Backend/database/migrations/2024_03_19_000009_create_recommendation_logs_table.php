<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('recommendation_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->enum('recommendation_type', ['responsible', 'lifecycle', 'progressive', 'conversational'])->default('responsible');
            $table->enum('interaction_result', ['viewed', 'clicked', 'purchased', 'ignored'])->default('viewed');
            $table->json('recommendation_context')->nullable();
            $table->json('user_context')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('recommendation_logs');
    }
}; 