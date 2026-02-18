<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $product = $this->record;

        // Load French
        $fr = $product->translation('fr');
        if ($fr) {
            $data['fr_title'] = $fr->title;
            $data['fr_slug'] = $fr->slug;
            $data['fr_description'] = $fr->description;
            $data['fr_meta_title'] = $fr->meta_title;
            $data['fr_meta_description'] = $fr->meta_description;
        }

        // Load Arabic
        $ar = $product->translation('ar');
        if ($ar) {
            $data['ar_title'] = $ar->title;
            $data['ar_slug'] = $ar->slug;
            $data['ar_description'] = $ar->description;
            $data['ar_meta_title'] = $ar->meta_title;
            $data['ar_meta_description'] = $ar->meta_description;
        }

        return $data;
    }

    protected function afterSave(): void
    {
        $data = $this->form->getRawState();
        $product = $this->record;

        // Update French
        $product->translations()->updateOrCreate(
            ['locale' => 'fr'],
            [
                'title' => $data['fr_title'],
                'slug' => $data['fr_slug'],
                'description' => $data['fr_description'] ?? null,
                'meta_title' => $data['fr_meta_title'] ?? null,
                'meta_description' => $data['fr_meta_description'] ?? null,
            ]
        );

        // Update Arabic
        $product->translations()->updateOrCreate(
            ['locale' => 'ar'],
            [
                'title' => $data['ar_title'],
                'slug' => $data['ar_slug'],
                'description' => $data['ar_description'] ?? null,
                'meta_title' => $data['ar_meta_title'] ?? null,
                'meta_description' => $data['ar_meta_description'] ?? null,
            ]
        );

        // Update auditing
        $product->update(['updated_by' => auth()->id()]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
