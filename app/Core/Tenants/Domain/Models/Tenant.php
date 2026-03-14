<?php

declare(strict_types=1);

namespace App\Core\Tenants\Domain\Models;

use App\Core\Plans\Domain\Models\Plan;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    protected $casts = [
        'data' => 'array',
    ];

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'church_name',
            'slug',
            'plan_id',
            'status',
            'pastor_name',
            'email',
            'phone',
            'address',
            'created_at',
            'updated_at',
        ];
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class, 'plan_id');
    }

    public function hasModule(string $slug): bool
    {
        return $this->plan
            && $this->plan->modules()->where('slug', $slug)->exists();
    }
}
