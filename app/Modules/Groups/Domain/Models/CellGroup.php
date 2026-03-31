<?php

declare(strict_types=1);

namespace App\Modules\Groups\Domain\Models;

use App\Modules\Members\Domain\Models\Member;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class CellGroup extends Model
{
    use LogsActivity;

    protected $table = 'cell_groups';

    protected $fillable = [
        'name',
        'opening_date',
        'address',
        'map_url',
        'host_type',
        'host_member_id',
        'host_name',
        'host_phone',
        'notes',
        'is_active',
    ];

    protected $appends = ['host_display_name', 'attendees_count'];

    protected $casts = [
        'opening_date' => 'date',
        'is_active' => 'boolean',
    ];

    // ── Relaciones ──

    public function hostMember(): BelongsTo
    {
        return $this->belongsTo(Member::class, 'host_member_id');
    }

    public function attendees(): HasMany
    {
        return $this->hasMany(CellGroupAttendee::class);
    }

    // ── Accessors ──

    public function getHostDisplayNameAttribute(): string
    {
        if ($this->host_type === 'member' && $this->hostMember) {
            return $this->hostMember->full_name;
        }

        return $this->host_name ?? '—';
    }

    public function getAttendeesCountAttribute(): int
    {
        return $this->attendees()->count();
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
            ->logOnly(['name', 'opening_date', 'address', 'host_type', 'host_name', 'is_active'])
            ->logOnlyDirty()
            ->setDescriptionForEvent(fn (string $eventName) => "Grupo celular {$eventName}");
    }
}
