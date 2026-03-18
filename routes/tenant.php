<?php

declare(strict_types=1);

use App\Http\Controllers\Tenant\AuthController;
use App\Http\Controllers\Tenant\FamilyController;
use App\Http\Controllers\Tenant\MemberController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Stancl\Tenancy\Middleware\InitializeTenancyBySubdomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Rutas del tenant (cada iglesia). Se accede vía subdominio:
| {iglesia}.poimano.localhost (local)
| {iglesia}.poimano.com (producción)
|
*/

Route::middleware([
    'web',
    InitializeTenancyBySubdomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {

    // --- Auth (público) ---
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [AuthController::class, 'login']);
    });

    Route::post('/logout', [AuthController::class, 'logout'])
        ->middleware('auth')
        ->name('logout');

    // --- Rutas protegidas ---
    Route::middleware('auth')->group(function () {
        Route::get('/', function () {
            return redirect('/dashboard');
        });

        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard', [
                'stats' => [
                    'total_members' => 0,
                    'active_groups' => 0,
                    'upcoming_events' => 0,
                    'monthly_income' => 0,
                ],
            ]);
        });

        Route::resource('members', MemberController::class);
        Route::resource('families', FamilyController::class);
    });
});
