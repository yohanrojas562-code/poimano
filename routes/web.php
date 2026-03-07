<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Central Routes (poimano.localhost)
|--------------------------------------------------------------------------
|
| Rutas del dominio central. Landing page, panel admin (Filament), etc.
| Solo accesibles desde los dominios centrales definidos en tenancy.php
|
*/

foreach (config('tenancy.central_domains') as $domain) {
    Route::domain($domain)->group(function () {
        Route::get('/', function () {
            return view('welcome');
        });

        // Las rutas de Filament Admin se registrarán automáticamente en /admin
    });
}
