<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cell_groups', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->date('opening_date');
            $table->text('address');

            // ── Anfitrión ──
            $table->enum('host_type', ['member', 'external'])->default('external');
            $table->foreignId('host_member_id')->nullable()->constrained('members')->nullOnDelete();
            $table->string('host_name')->nullable();
            $table->string('host_phone', 20)->nullable();

            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);

            $table->timestamps();

            // ── Índices ──
            $table->index('is_active');
            $table->index('opening_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cell_groups');
    }
};
