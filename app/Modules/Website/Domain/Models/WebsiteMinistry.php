<?php

declare(strict_types=1);

namespace App\Modules\Website\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class WebsiteMinistry extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'image',
        'description',
        'content',
        'gallery',
        'sort_order',
        'is_visible',
    ];

    protected $casts = [
        'gallery'    => 'array',
        'is_visible' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $m) {
            if (empty($m->slug)) {
                $m->slug = Str::slug($m->name);
            }
        });

        static::updating(function (self $m) {
            if ($m->isDirty('name')) {
                $m->slug = Str::slug($m->name);
            }
        });
    }

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }
}
