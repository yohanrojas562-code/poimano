<?php

declare(strict_types=1);

namespace App\Modules\Website\Domain\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteSection extends Model
{
    protected $fillable = [
        'template',
        'section_key',
        'sort_order',
        'is_visible',
        'content',
    ];

    protected $casts = [
        'content'    => 'array',
        'is_visible' => 'boolean',
    ];
}
