<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ModuleServiceProvider extends ServiceProvider
{
    /**
     * List of Core (SaaS platform) service providers.
     */
    protected array $core = [
        \App\Core\Tenants\Infrastructure\Providers\TenantsServiceProvider::class,
        \App\Core\Plans\Infrastructure\Providers\PlansServiceProvider::class,
        \App\Core\Settings\Infrastructure\Providers\SettingsServiceProvider::class,
        \App\Core\Billing\Infrastructure\Providers\BillingServiceProvider::class,
    ];

    /**
     * List of module (church/tenant) service providers.
     */
    protected array $modules = [
        \App\Modules\Church\Infrastructure\Providers\ChurchServiceProvider::class,
        \App\Modules\Members\Infrastructure\Providers\MembersServiceProvider::class,
        \App\Modules\Projects\Infrastructure\Providers\ProjectsServiceProvider::class,
        \App\Modules\Activities\Infrastructure\Providers\ActivitiesServiceProvider::class,
        \App\Modules\Attendance\Infrastructure\Providers\AttendanceServiceProvider::class,
        \App\Modules\Groups\Infrastructure\Providers\GroupsServiceProvider::class,
        \App\Modules\Finance\Infrastructure\Providers\FinanceServiceProvider::class,
        \App\Modules\Communication\Infrastructure\Providers\CommunicationServiceProvider::class,
        \App\Modules\Reports\Infrastructure\Providers\ReportsServiceProvider::class,
    ];

    public function register(): void
    {
        foreach ($this->core as $provider) {
            $this->app->register($provider);
        }

        foreach ($this->modules as $module) {
            $this->app->register($module);
        }
    }

    public function boot(): void
    {
        //
    }
}
