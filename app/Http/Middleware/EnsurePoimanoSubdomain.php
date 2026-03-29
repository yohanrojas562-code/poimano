<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Ensures admin routes are accessed only through poimano subdomains.
 * If a custom domain hits an admin route, redirect to the subdomain version.
 */
class EnsurePoimanoSubdomain
{
    public function handle(Request $request, Closure $next): Response
    {
        $host = $request->getHost();

        // Check if the host is a poimano subdomain
        $isPoimano = false;
        foreach (config('tenancy.central_domains', []) as $central) {
            if (str_ends_with($host, '.' . $central)) {
                $isPoimano = true;
                break;
            }
        }

        if (! $isPoimano) {
            // Custom domain accessing admin route → redirect to subdomain
            $tenant = tenant();
            if ($tenant) {
                $appDomain = app()->environment('production') ? 'poimano.com' : 'poimano.localhost';
                $scheme = $request->isSecure() ? 'https' : 'http';
                $url = "{$scheme}://{$tenant->id}.{$appDomain}" . $request->getRequestUri();

                return redirect()->away($url);
            }
        }

        return $next($request);
    }
}
