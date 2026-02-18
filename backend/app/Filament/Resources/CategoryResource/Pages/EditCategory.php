<?php

namespace App\Filament\Resources\CategoryResource\Pages;

use App\Filament\Resources\CategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCategory extends EditRecord
{
    protected static string $resource = CategoryResource::class;

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $category = $this->record;

        // Load French
        $fr = $category->translation('fr');
        if ($fr) {
            $data['fr_name'] = $fr->name;
            $data['fr_description'] = $fr->description;
        }

        // Load Arabic
        $ar = $category->translation('ar');
        if ($ar) {
            $data['ar_name'] = $ar->name;
            $data['ar_description'] = $ar->description;
        }

        return $data;
    }

    protected function afterSave(): void
    {
        $data = $this->form->getRawState();
        $category = $this->record;

        // Update French
        $category->translations()->updateOrCreate(
            ['locale' => 'fr'],
            [
                'name' => $data['fr_name'],
                'description' => $data['fr_description'] ?? null,
            ]
        );

        // Update Arabic
        $category->translations()->updateOrCreate(
            ['locale' => 'ar'],
            [
                'name' => $data['ar_name'],
                'description' => $data['ar_description'] ?? null,
            ]
        );
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
