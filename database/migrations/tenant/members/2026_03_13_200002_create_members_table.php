<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();

            // ── Datos personales ──
            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('second_last_name')->nullable();
            $table->enum('gender', ['masculino', 'femenino']);
            $table->date('birth_date')->nullable();
            $table->string('photo')->nullable();
            $table->string('blood_type', 5)->nullable();
            $table->enum('marital_status', ['soltero', 'casado', 'viudo', 'divorciado', 'union_libre'])->nullable();
            $table->string('nationality')->nullable();
            $table->string('document_type', 20)->nullable();
            $table->string('document_number', 30)->nullable();

            // ── Contacto ──
            $table->string('email')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('mobile', 20)->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip_code', 15)->nullable();
            $table->unsignedBigInteger('country_id')->nullable();

            // ── Vida espiritual ──
            $table->enum('member_status', ['activo', 'inactivo', 'transferido', 'fallecido', 'excomunicado'])->default('activo');
            $table->enum('category', ['nuevo_creyente', 'creyente', 'lider', 'pastor', 'misionero'])->default('nuevo_creyente');
            $table->boolean('is_baptized')->default(false);
            $table->date('baptism_date')->nullable();
            $table->string('baptism_church')->nullable();
            $table->date('conversion_date')->nullable();
            $table->date('membership_date')->nullable();
            $table->string('how_arrived')->nullable();
            $table->foreignId('referred_by_id')->nullable()->constrained('members')->nullOnDelete();

            // ── Familia ──
            $table->foreignId('family_id')->nullable()->constrained('families')->nullOnDelete();
            $table->enum('family_role', ['cabeza', 'esposa', 'hijo', 'otro'])->nullable();

            // ── Administrativo ──
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);

            $table->timestamps();
            $table->softDeletes();

            // ── Índices ──
            $table->index(['member_status', 'is_active']);
            $table->index('category');
            $table->index('family_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
