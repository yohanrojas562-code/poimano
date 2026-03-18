<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('church_settings', function (Blueprint $table) {
            $table->string('text_color', 7)->default('#FFFFFF')->after('secondary_color');
        });
    }

    public function down(): void
    {
        Schema::table('church_settings', function (Blueprint $table) {
            $table->dropColumn('text_color');
        });
    }
};
