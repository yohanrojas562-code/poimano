<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('member_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained('members')->cascadeOnDelete();
            $table->string('skill');
            $table->timestamps();

            $table->unique(['member_id', 'skill']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('member_skills');
    }
};
