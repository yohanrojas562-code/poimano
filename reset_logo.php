<?php

// Temporary script to reset logo - run from project root
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$tenant = App\Core\Tenants\Domain\Models\Tenant::find('lasalle');
$tenant->run(function () {
    $s = App\Modules\Church\Domain\Models\ChurchSetting::first();
    if ($s) {
        $s->update(['logo' => null]);
        echo "Logo reset for: " . $s->church_name . "\n";
    } else {
        echo "No settings found\n";
    }
});
