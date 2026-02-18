<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use App\Models\ProductTranslation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Global Information')
                    ->schema([
                        Forms\Components\TextInput::make('sku')
                            ->required()
                            ->unique(ignoreRecord: true),
                        Forms\Components\TextInput::make('price')
                            ->numeric()
                            ->prefix('$')
                            ->required(),
                        Forms\Components\TextInput::make('stock')
                            ->numeric()
                            ->default(0)
                            ->required(),
                        Forms\Components\Select::make('category_id')
                            ->relationship('category', 'slug')
                            ->searchable()
                            ->preload(),
                        Forms\Components\Toggle::make('is_published')
                            ->label('Published on Frontend')
                            ->default(false),
                    ])->columns(2),

                Forms\Components\Section::make('Multilingual Details')
                    ->schema([
                        Forms\Components\Tabs::make('Translations')
                            ->tabs([
                                Forms\Components\Tabs\Tab::make('French (FR)')
                                    ->schema([
                                        Forms\Components\TextInput::make('fr_title')
                                            ->label('Titre')
                                            ->required(),
                                        Forms\Components\TextInput::make('fr_slug')
                                            ->label('Slug')
                                            ->required(),
                                        Forms\Components\RichEditor::make('fr_description')
                                            ->label('Description'),
                                        Forms\Components\TextInput::make('fr_meta_title')
                                            ->label('Meta Title'),
                                        Forms\Components\Textarea::make('fr_meta_description')
                                            ->label('Meta Description'),
                                    ]),
                                Forms\Components\Tabs\Tab::make('Arabic (AR)')
                                    ->schema([
                                        Forms\Components\TextInput::make('ar_title')
                                            ->label('العنوان')
                                            ->extraInputAttributes(['dir' => 'rtl'])
                                            ->required(),
                                        Forms\Components\TextInput::make('ar_slug')
                                            ->label('الاسم اللطيف (Slug)')
                                            ->extraInputAttributes(['dir' => 'rtl'])
                                            ->required(),
                                        Forms\Components\RichEditor::make('ar_description')
                                            ->label('الوصف')
                                            ->extraInputAttributes(['dir' => 'rtl']),
                                        Forms\Components\TextInput::make('ar_meta_title')
                                            ->label('عنوان الميتا'),
                                        Forms\Components\Textarea::make('ar_meta_description')
                                            ->label('وصف الميتا'),
                                    ]),
                            ]),
                    ]),

                Forms\Components\Section::make('Media')
                    ->schema([
                        Forms\Components\FileUpload::make('images')
                            ->multiple()
                            ->directory('products')
                            ->image()
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('16:9')
                            ->imageResizeTargetWidth('1920')
                            ->imageResizeTargetHeight('1080'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('images')
                    ->label('Image')
                    ->circular()
                    ->limit(1),
                TextColumn::make('sku')
                    ->searchable()
                    ->sortable(),
                // Show the title from the default translation (fr)
                TextColumn::make('translations.title')
                    ->label('Title (FR)')
                    ->getStateUsing(fn($record) => $record->translation('fr')?->title)
                    ->searchable(),
                TextColumn::make('price')
                    ->money('eur')
                    ->sortable(),
                TextColumn::make('stock')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_published')
                    ->boolean()
                    ->label('Status'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('is_published')
                    ->options([
                        0 => 'Unpublished',
                        1 => 'Published',
                    ]),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
