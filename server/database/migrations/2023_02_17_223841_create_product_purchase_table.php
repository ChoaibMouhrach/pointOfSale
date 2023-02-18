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
        Schema::create('product_purchase', function (Blueprint $table) {
            $table->id();
            $table->double("total_cost");
            $table->double("quantity");
            $table->string("product_id");
            $table->foreignId("purchase_id")->constrained("purchases")->onDelete("cascade");
            $table->foreignId("supplier_id")->constrained("suppliers")->onDelete("cascade");
            $table->foreign('product_id')->references('code')->on('products');
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
        Schema::dropIfExists('product_purchase');
    }
};
