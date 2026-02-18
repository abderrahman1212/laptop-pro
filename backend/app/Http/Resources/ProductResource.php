<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $translation = $this->translation();
        return [
            'id' => $this->id,
            'sku' => $this->sku,
            'price' => $this->price,
            'stock' => $this->stock,
            'is_published' => $this->is_published,
            'images' => $this->images,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'title' => $translation?->title,
            'slug' => $translation?->slug,
            'description' => $translation?->description,
            'meta_title' => $translation?->meta_title,
            'meta_description' => $translation?->meta_description,
        ];
    }
}
