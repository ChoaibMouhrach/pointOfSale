<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Supplier;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // $this->call(ProductSeeder::class);

        $this->call(SettingSeeder::class);
        $this->call(UserSeeder::class);

        User::factory(10)->create();
        Category::factory(10)->create();
        Unit::factory(10)->create();
        Brand::factory(10)->create();
        Supplier::factory(10)->create();
        Sale::factory(10)->create();
        Purchase::factory(10)->create();
        Product::factory(100)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
