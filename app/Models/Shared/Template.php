<?php

declare(strict_types=1);

namespace App\Models\Shared;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $connection = 'central';

    protected $fillable = [
        'name',
        'slug',
        'type',
        'module',
        'subject',
        'body',
        'variables',
        'is_active',
    ];

    protected $casts = [
        'variables' => 'array',
        'is_active' => 'boolean',
    ];
}
