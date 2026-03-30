<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('website_social_networks', function (Blueprint $table) {
            $table->id();
            $table->string('platform');          // facebook, instagram, youtube, tiktok, twitter, etc.
            $table->string('icon');               // icon key from the icon library
            $table->string('url');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });

        Schema::create('website_whatsapp_config', function (Blueprint $table) {
            $table->id();
            $table->string('phone_number');
            $table->text('default_message')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('website_whatsapp_config');
        Schema::dropIfExists('website_social_networks');
    }
};
