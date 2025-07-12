<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('product_lifecycles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('average_lifespan')->comment('in months');
            $table->integer('maintenance_frequency')->comment('in months');
            $table->decimal('energy_consumption', 10, 2)->nullable();
            $table->json('maintenance_requirements')->nullable();
            $table->json('upgrade_paths')->nullable();
            $table->json('compatibility_info')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_lifecycles');
    }
}; 