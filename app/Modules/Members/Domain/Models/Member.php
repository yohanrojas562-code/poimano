<?php

declare(strict_types=1);

namespace App\Modules\Members\Domain\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Member extends Model
{
    use SoftDeletes, LogsActivity;

    protected $fillable = [
        // Datos personales
        'first_name', 'middle_name', 'last_name', 'second_last_name',
        'gender', 'birth_date', 'photo', 'blood_type',
        'marital_status', 'nationality', 'document_type', 'document_number',
        // Contacto
        'email', 'phone', 'mobile', 'address', 'city', 'state', 'zip_code', 'country_id',
        // Vida espiritual
        'member_status', 'category', 'is_baptized', 'baptism_date', 'baptism_church',
        'conversion_date', 'membership_date', 'how_arrived', 'referred_by_id',
        // Familia
        'family_id', 'family_role',
        // Administrativo
        'user_id', 'notes', 'is_active',
    ];

    protected $appends = ['full_name', 'complete_name'];

    protected $casts = [
        'birth_date' => 'date',
        'baptism_date' => 'date',
        'conversion_date' => 'date',
        'membership_date' => 'date',
        'is_baptized' => 'boolean',
        'is_active' => 'boolean',
    ];

    // ── Relaciones ──

    public function family(): BelongsTo
    {
        return $this->belongsTo(Family::class);
    }

    public function referredBy(): BelongsTo
    {
        return $this->belongsTo(self::class, 'referred_by_id');
    }

    public function referrals(): HasMany
    {
        return $this->hasMany(self::class, 'referred_by_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function skills(): HasMany
    {
        return $this->hasMany(MemberSkill::class);
    }

    public function history(): HasMany
    {
        return $this->hasMany(MemberHistory::class)->orderByDesc('changed_at');
    }

    // ── Accessors ──

    public function getFullNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }

    public function getCompleteNameAttribute(): string
    {
        return trim(implode(' ', array_filter([
            $this->first_name,
            $this->middle_name,
            $this->last_name,
            $this->second_last_name,
        ])));
    }

    // ── Scopes ──

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->where('member_status', 'activo');
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public function scopeBaptized($query)
    {
        return $query->where('is_baptized', true);
    }

    // ── Activity Log ──

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['first_name', 'last_name', 'member_status', 'category', 'is_baptized', 'email', 'phone'])
            ->logOnlyDirty()
            ->setDescriptionForEvent(fn (string $eventName) => "Miembro {$eventName}");
    }
}
