<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "id" => $this->faker->unique()->name(),
            "name" => $this->faker->name(),
            "cost" => $this->faker->randomFloat(4, 500, 1000),
            "price" => $this->faker->randomFloat(4, 500, 1000),
            "stock" => $this->faker->numberBetween(10, 100),
            "image" => $this->faker->sentence(1),
            "unit_id" => $this->faker->numberBetween(1, 10),
            "brand_id" => $this->faker->numberBetween(1, 10),
            "category_id" => $this->faker->numberBetween(1, 10),
        ];
    }
}
