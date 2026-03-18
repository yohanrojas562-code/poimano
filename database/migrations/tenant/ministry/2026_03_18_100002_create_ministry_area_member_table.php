<?php
declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ministry_area_member', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ministry_area_id')->constrained('ministry_areas')->cascadeOnDelete();
            $table->foreignId('member_id')->constrained('members')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['ministry_area_id', 'member_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ministry_area_member');
    }
};
