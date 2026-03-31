<?php

declare(strict_types=1);

namespace App\Modules\Groups\Domain\Models;

use App\Modules\Members\Domain\Models\Member;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CellGroupAttendee extends Model
{
    protected $table = 'cell_group_attendees';

    protected $fillable = [
        'cell_group_id',
        'type',
        'member_id',
        'name',
        'phone',
    ];

    protected $appends = ['display_name'];

    // ── Relaciones ──

    public function cellGroup(): BelongsTo
    {
        return $this->belongsTo(CellGroup::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    // ── Accessors ──

    public function getDisplayNameAttribute(): string
    {
        if ($this->type === 'member' && $this->member) {
            return $this->member->full_name;
        }

        return $this->name ?? '—';
    }
}
