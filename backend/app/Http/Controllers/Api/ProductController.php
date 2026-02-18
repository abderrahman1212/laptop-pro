<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['translations', 'category.translations'])
            ->where('is_published', true);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $products = $query->paginate(12);
        return ProductResource::collection($products);
    }

    public function show($id)
    {
        $product = Product::with(['translations', 'category.translations'])
            ->where('is_published', true)
            ->findOrFail($id);
        return new ProductResource($product);
    }
}
