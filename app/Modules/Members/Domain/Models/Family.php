<?php

declare(strict_types=1);

namespace App\Modules\Members\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Family extends Model
{
    protected $fillable = [
        'name', 'address', 'phone', 'wedding_date', 'notes',
    ];

    protected $casts = [
        'wedding_date' => 'date',
    ];

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }
}
