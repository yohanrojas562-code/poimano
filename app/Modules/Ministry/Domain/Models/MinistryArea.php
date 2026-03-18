<?php
declare(strict_types=1);

namespace App\Modules\Ministry\Domain\Models;

use App\Modules\Members\Domain\Models\Member;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class MinistryArea extends Model
{
    use LogsActivity;

    protected $fillable = [
        'name',
        'description',
        'coordinator_id',
        'consolidator_id',
        'spiritual_id',
        'evangelism_id',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // ── Relaciones ──

    public function coordinator(): BelongsTo
    {
        return $this->belongsTo(Member::class, 'coordinator_id');
    }

    public function consolidator(): BelongsTo
    {
        return $this->belongsTo(Member::class, 'consolidator_id');
    }

    public function spiritual(): BelongsTo
    {
        return $this->belongsTo(Member::class, 'spiritual_id');
    }

    public function evangelism(): BelongsTo
    {
        return $this->belongsTo(Member::class, 'evangelism_id');
    }

    public function networkMembers(): BelongsToMany
    {
        return $this->belongsToMany(Member::class, 'ministry_area_member')->withTimestamps();
    }

    // ── Scopes ──

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // ── Activity Log ──

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'coordinator_id', 'consolidator_id', 'spiritual_id', 'evangelism_id', 'is_active'])
            ->logOnlyDirty()
            ->setDescriptionForEvent(fn (string $eventName) => "Área ministerial {$eventName}");
    }
}
