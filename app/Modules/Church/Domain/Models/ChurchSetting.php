<?php

declare(strict_types=1);

namespace App\Modules\Church\Domain\Models;

use Illuminate\Database\Eloquent\Model;

class ChurchSetting extends Model
{
    protected $fillable = [
        'church_name',
        'logo',
        'slogan',
        'primary_color',
        'secondary_color',
        'language',
        'currency',
        'timezone',
        'phone',
        'email',
        'address',
        'city',
        'country_id',
        'website',
        'founded_at',
        'denomination',
    ];

    protected $casts = [
        'founded_at' => 'date',
    ];
}
