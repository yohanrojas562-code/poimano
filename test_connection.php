<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Test PostgreSQL
try {
    DB::connection()->getPdo();
    echo "PostgreSQL: CONECTADO - " . DB::connection()->getDatabaseName() . PHP_EOL;
} catch (Exception $e) {
    echo "PostgreSQL ERROR: " . $e->getMessage() . PHP_EOL;
}

// Test Redis
try {
    Illuminate\Support\Facades\Cache::store("redis")->put("test", "ok", 60);
    $val = Illuminate\Support\Facades\Cache::store("redis")->get("test");
    echo "Redis: CONECTADO - test=" . $val . PHP_EOL;
} catch (Exception $e) {
    echo "Redis ERROR: " . $e->getMessage() . PHP_EOL;
}
