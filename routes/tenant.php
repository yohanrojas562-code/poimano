<?php

declare(strict_types=1);

use App\Http\Controllers\Tenant\AuthController;
use App\Http\Controllers\Tenant\ChurchSettingController;
use App\Http\Controllers\Tenant\DashboardController;
use App\Http\Controllers\Tenant\FamilyController;
use App\Http\Controllers\Tenant\MemberController;
use App\Http\Controllers\Tenant\MinistryAreaController;
use App\Http\Controllers\Tenant\PublicWebsiteController;
use App\Http\Controllers\Tenant\WebsiteSettingController;
use Illuminate\Support\Facades\Route;
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

    // --- Sitio web público ---
    Route::get('/', PublicWebsiteController::class);

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
        Route::get('/dashboard', DashboardController::class);

        Route::resource('members', MemberController::class);
        Route::resource('families', FamilyController::class);
        Route::resource('ministry-areas', MinistryAreaController::class);

        // Configuración de iglesia
        Route::get('/settings/church', [ChurchSettingController::class, 'edit']);
        Route::put('/settings/church', [ChurchSettingController::class, 'update']);

        // Sitio web - administración
        Route::get('/settings/website', [WebsiteSettingController::class, 'index']);
        Route::put('/settings/website', [WebsiteSettingController::class, 'updateSettings']);
        Route::put('/settings/website/sections/{section}', [WebsiteSettingController::class, 'updateSection']);
        Route::post('/settings/website/sections/{section}/image', [WebsiteSettingController::class, 'uploadSectionImage']);
        Route::delete('/settings/website/sections/{section}/image', [WebsiteSettingController::class, 'removeSectionImage']);
    });
});
