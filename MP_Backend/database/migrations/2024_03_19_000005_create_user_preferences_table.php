<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('user_preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('ecological_priority')->default(0); // 0-100 scale
            $table->json('budget_range'); // [min, max]
            $table->enum('expertise_level', ['beginner', 'intermediate', 'advanced'])->default('beginner');
            $table->json('interests')->nullable();
            $table->json('excluded_categories')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_preferences');
    }
}; 