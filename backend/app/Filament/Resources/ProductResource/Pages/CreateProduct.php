<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateProduct extends CreateRecord
{
    protected static string $resource = ProductResource::class;

    protected function afterCreate(): void
    {
        $data = $this->form->getRawState();
        $product = $this->record;

        // Save French Translation
        $product->translations()->create([
            'locale' => 'fr',
            'title' => $data['fr_title'],
            'slug' => $data['fr_slug'],
            'description' => $data['fr_description'] ?? null,
            'meta_title' => $data['fr_meta_title'] ?? null,
            'meta_description' => $data['fr_meta_description'] ?? null,
        ]);

        // Save Arabic Translation
        $product->translations()->create([
            'locale' => 'ar',
            'title' => $data['ar_title'],
            'slug' => $data['ar_slug'],
            'description' => $data['ar_description'] ?? null,
            'meta_title' => $data['ar_meta_title'] ?? null,
            'meta_description' => $data['ar_meta_description'] ?? null,
        ]);

        // Log auditing info (optional, could be done via observer)
        $product->update(['created_by' => auth()->id()]);
    }
}
