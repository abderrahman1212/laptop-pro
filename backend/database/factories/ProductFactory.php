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
    public function definition(): array
    {
        return [
            'sku' => strtoupper($this->faker->unique()->bothify('LAP-####')),
            'price' => $this->faker->randomFloat(2, 500, 3000),
            'stock' => $this->faker->numberBetween(0, 50),
            'is_published' => $this->faker->boolean(80),
            'category_id' => \App\Models\Category::factory(),
            'created_by' => \App\Models\User::factory(),
        ];
    }
}
