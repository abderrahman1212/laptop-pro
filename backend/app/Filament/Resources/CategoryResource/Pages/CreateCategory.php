<?php

namespace App\Filament\Resources\CategoryResource\Pages;

use App\Filament\Resources\CategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCategory extends CreateRecord
{
    protected static string $resource = CategoryResource::class;

    protected function afterCreate(): void
    {
        $data = $this->form->getRawState();
        $category = $this->record;

        // Save French
        $category->translations()->create([
            'locale' => 'fr',
            'name' => $data['fr_name'],
            'description' => $data['fr_description'] ?? null,
        ]);

        // Save Arabic
        $category->translations()->create([
            'locale' => 'ar',
            'name' => $data['ar_name'],
            'description' => $data['ar_description'] ?? null,
        ]);
    }
}
