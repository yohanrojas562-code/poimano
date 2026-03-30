<?php

declare(strict_types=1);

use App\Http\Controllers\Tenant\AuthController;
use App\Http\Controllers\Tenant\ChurchSettingController;
use App\Http\Controllers\Tenant\DashboardController;
use App\Http\Controllers\Tenant\FamilyController;
use App\Http\Controllers\Tenant\MemberController;
use App\Http\Controllers\Tenant\MinistryAreaController;
use App\Http\Controllers\Tenant\PublicWebsiteController;
use App\Http\Controllers\Tenant\CustomDomainController;
use App\Http\Controllers\Tenant\WebsiteSettingController;
use App\Http\Controllers\Tenant\WebsiteMinistryController;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomainOrSubdomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use App\Http\Middleware\EnsurePoimanoSubdomain;

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
    InitializeTenancyByDomainOrSubdomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {

    // --- Sitio web público ---
    Route::get('/', PublicWebsiteController::class);
    Route::get('/ministerios/{slug}', [PublicWebsiteController::class, 'ministry']);

    // --- Auth (público) --- Solo en subdominio poimano
    Route::middleware(['guest', EnsurePoimanoSubdomain::class])->group(function () {
        Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [AuthController::class, 'login']);
    });

    Route::post('/logout', [AuthController::class, 'logout'])
        ->middleware(['auth', EnsurePoimanoSubdomain::class])
        ->name('logout');

    // --- Rutas protegidas --- Solo en subdominio poimano
    Route::middleware(['auth', EnsurePoimanoSubdomain::class])->group(function () {
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

        // Dominio propio
        Route::post('/settings/website/domain', [CustomDomainController::class, 'store']);
        Route::delete('/settings/website/domain', [CustomDomainController::class, 'destroy']);

        // Ministerios del sitio web
        Route::post('/settings/website/ministries/sync', [WebsiteMinistryController::class, 'syncFromAreas']);
        Route::post('/settings/website/ministries', [WebsiteMinistryController::class, 'store']);
        Route::put('/settings/website/ministries/{ministry}', [WebsiteMinistryController::class, 'update']);
        Route::delete('/settings/website/ministries/{ministry}', [WebsiteMinistryController::class, 'destroy']);
        Route::post('/settings/website/ministries/{ministry}/image', [WebsiteMinistryController::class, 'uploadImage']);
        Route::delete('/settings/website/ministries/{ministry}/image', [WebsiteMinistryController::class, 'removeImage']);
        Route::post('/settings/website/ministries/{ministry}/gallery', [WebsiteMinistryController::class, 'uploadGalleryImage']);
        Route::delete('/settings/website/ministries/{ministry}/gallery', [WebsiteMinistryController::class, 'removeGalleryImage']);
    });
});
