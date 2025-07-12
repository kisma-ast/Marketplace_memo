<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('product_relationships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('related_product_id')->constrained('products')->onDelete('cascade');
            $table->enum('relationship_type', ['complementary', 'alternative', 'upgrade', 'downgrade', 'accessory'])->default('complementary');
            $table->decimal('compatibility_score', 3, 2)->default(1.00);
            $table->json('relationship_metadata')->nullable();
            $table->timestamps();

            $table->unique(['product_id', 'related_product_id', 'relationship_type']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_relationships');
    }
}; 