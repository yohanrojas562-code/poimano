<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('church_settings', function (Blueprint $table) {
            $table->id();
            $table->string('church_name');
            $table->string('logo')->nullable();
            $table->string('slogan')->nullable();
            $table->string('primary_color', 7)->default('#00105E');
            $table->string('secondary_color', 7)->default('#00E1FF');
            $table->string('language', 5)->default('es');
            $table->string('currency', 10)->default('USD');
            $table->string('timezone', 50)->default('America/Bogota');
            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->unsignedBigInteger('country_id')->nullable();
            $table->string('website')->nullable();
            $table->date('founded_at')->nullable();
            $table->string('denomination')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('church_settings');
    }
};
