<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->string("id")->primary();
            $table->string("name");
            $table->string("cost");
            $table->string("price");
            $table->integer("stock");
            $table->string("image")->nullable();
            $table->foreignId("unit_id")->constrained("units")->onDelete("cascade");
            $table->foreignId("brand_id")->constrained("brands")->onDelete("cascade");
            $table->foreignId("category_id")->constrained("categories")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
