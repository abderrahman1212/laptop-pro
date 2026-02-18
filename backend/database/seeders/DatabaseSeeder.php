<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@pro.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ]
        );

        $categoriesData = [
            ['slug' => 'laptops', 'fr' => 'Ordinateurs Portables', 'ar' => 'أجهزة الكمبيوتر المحمولة'],
            ['slug' => 'gadgets', 'fr' => 'Gadgets', 'ar' => 'أجهزة ذكية'],
            ['slug' => 'parts', 'fr' => 'Pièces Déchargées', 'ar' => 'قطع غيار'],
            ['slug' => 'accessories', 'fr' => 'Accessoires', 'ar' => 'إكسسوارات'],
        ];

        foreach ($categoriesData as $c) {
            $category = \App\Models\Category::create(['slug' => $c['slug']]);
            $category->translations()->createMany([
                ['locale' => 'fr', 'name' => $c['fr'], 'description' => "Description for " . $c['fr']],
                ['locale' => 'ar', 'name' => $c['ar'], 'description' => "وصف لـ " . $c['ar']],
            ]);

            // Create 8 products for each category
            for ($i = 1; $i <= 8; $i++) {
                $product = \App\Models\Product::create([
                    'sku' => strtoupper($c['slug']) . '-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                    'price' => rand(300, 2500),
                    'stock' => rand(0, 20),
                    'is_published' => true,
                    'category_id' => $category->id,
                    'created_by' => $admin->id,
                ]);

                $product->translations()->createMany([
                    [
                        'locale' => 'fr',
                        'title' => "Produit " . $c['fr'] . " " . $i,
                        'slug' => $c['slug'] . "-prod-" . $i,
                        'description' => "Ceci est un produit de test de haute qualité pour " . $c['fr'],
                        'meta_title' => "Acheter " . $c['fr'] . " " . $i,
                        'meta_description' => "Meilleur prix pour ce produit au Maroc."
                    ],
                    [
                        'locale' => 'ar',
                        'title' => "منتج " . $c['ar'] . " " . $i,
                        'slug' => $c['slug'] . "-prod-" . $i . "-ar",
                        'description' => "هذا منتج اختباري عالي الجودة لـ " . $c['ar'],
                        'meta_title' => "شراء " . $c['ar'] . " " . $i,
                        'meta_description' => "أفضل سعر لهذا المنتج في المغرب."
                    ],
                ]);
            }
        }
    }
}
