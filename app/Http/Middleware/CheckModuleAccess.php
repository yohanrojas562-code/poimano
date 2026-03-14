<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckModuleAccess
{
    /**
     * Verifica que el tenant actual tenga acceso al módulo solicitado.
     *
     * Uso en rutas:  ->middleware('module:finance')
     */
    public function handle(Request $request, Closure $next, string $module): Response
    {
        $tenant = tenant();

        if (! $tenant || ! $tenant->hasModule($module)) {
            abort(403, 'Tu plan no incluye acceso a este módulo.');
        }

        return $next($request);
    }
}
