<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('website_settings', function (Blueprint $table) {
            $table->id();
            $table->string('template', 50)->default('esperanza'); // plantilla activa
            $table->boolean('is_published')->default(false);
            $table->timestamps();
        });

        Schema::create('website_sections', function (Blueprint $table) {
            $table->id();
            $table->string('template', 50);
            $table->string('section_key', 80);   // hero, about, services, events, contact, footer
            $table->integer('sort_order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->json('content');               // contenido editable en JSON
            $table->timestamps();

            $table->unique(['template', 'section_key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('website_sections');
        Schema::dropIfExists('website_settings');
    }
};
