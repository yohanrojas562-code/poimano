<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cell_groups', function (Blueprint $table) {
            $table->string('map_url', 2048)->nullable()->after('address');
        });
    }

    public function down(): void
    {
        Schema::table('cell_groups', function (Blueprint $table) {
            $table->dropColumn('map_url');
        });
    }
};
