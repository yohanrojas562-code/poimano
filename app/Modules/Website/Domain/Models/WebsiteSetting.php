<?php

declare(strict_types=1);

namespace App\Modules\Website\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WebsiteSetting extends Model
{
    protected $fillable = [
        'template',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function sections(): HasMany
    {
        return $this->hasMany(WebsiteSection::class, 'template', 'template')
            ->orderBy('sort_order');
    }
}
