<?php

namespace App\Http\Middleware;

use App\Modules\Church\Domain\Models\ChurchSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'tenant' => function () {
                if ($tenant = tenant()) {
                    return [
                        'id' => $tenant->id,
                        'church_name' => $tenant->church_name,
                        'slug' => $tenant->slug,
                        'status' => $tenant->status,
                    ];
                }
                return null;
            },
            'churchSettings' => function () {
                if (tenant()) {
                    $s = ChurchSetting::first();
                    if ($s) {
                        return [
                            'church_name'     => $s->church_name,
                            'logo'            => $s->logo ? '/storage/' . $s->logo : null,
                            'slogan'          => $s->slogan,
                            'primary_color'   => $s->primary_color,
                            'secondary_color' => $s->secondary_color,
                            'text_color'      => $s->text_color ?? '#FFFFFF',
                        ];
                    }
                }
                return null;
            },
        ];
    }
}
