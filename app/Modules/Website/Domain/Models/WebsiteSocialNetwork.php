<?php

namespace App\Modules\Website\Domain\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteSocialNetwork extends Model
{
    protected $fillable = [
        'platform',
        'icon',
        'url',
        'sort_order',
        'is_visible',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
    ];

    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }
}
