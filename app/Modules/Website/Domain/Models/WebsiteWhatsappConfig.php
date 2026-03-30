<?php

namespace App\Modules\Website\Domain\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteWhatsappConfig extends Model
{
    protected $table = 'website_whatsapp_config';

    protected $fillable = [
        'phone_number',
        'default_message',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
