<?php

declare(strict_types=1);

namespace App\Modules\Members\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MemberSkill extends Model
{
    protected $fillable = ['member_id', 'skill'];

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
}
