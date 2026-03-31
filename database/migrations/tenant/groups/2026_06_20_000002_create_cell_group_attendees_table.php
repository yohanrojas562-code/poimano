<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cell_group_attendees', function (Blueprint $table) {
            $table->id();

            $table->foreignId('cell_group_id')->constrained('cell_groups')->cascadeOnDelete();

            // ── Asistente ──
            $table->enum('type', ['member', 'external'])->default('external');
            $table->foreignId('member_id')->nullable()->constrained('members')->nullOnDelete();
            $table->string('name')->nullable();
            $table->string('phone', 20)->nullable();

            $table->timestamps();

            // ── Índices ──
            $table->index('cell_group_id');
            $table->unique(['cell_group_id', 'member_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cell_group_attendees');
    }
};
