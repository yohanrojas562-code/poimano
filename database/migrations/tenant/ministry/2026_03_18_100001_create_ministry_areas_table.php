<?php
declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ministry_areas', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();

            // ── Roles de liderazgo (solo miembros con categoría "lider") ──
            $table->foreignId('coordinator_id')->nullable()->constrained('members')->nullOnDelete();
            $table->foreignId('consolidator_id')->nullable()->constrained('members')->nullOnDelete();
            $table->foreignId('spiritual_id')->nullable()->constrained('members')->nullOnDelete();
            $table->foreignId('evangelism_id')->nullable()->constrained('members')->nullOnDelete();

            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ministry_areas');
    }
};
