<?php

declare(strict_types=1);

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;

class IssueSslCertificate implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 2;
    public int $backoff = 30;

    public function __construct(
        public readonly string $domain,
    ) {}

    public function handle(): void
    {
        $domain = $this->domain;

        // Validate domain format to prevent command injection
        if (! preg_match('/^[a-zA-Z0-9][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/', $domain)) {
            Log::error("[SSL] Invalid domain format: {$domain}");
            return;
        }

        $script = base_path('deploy/poimano-ssl.sh');

        if (! file_exists($script)) {
            Log::error("[SSL] Script not found: {$script}");
            return;
        }

        Log::info("[SSL] Issuing certificate for: {$domain}");

        $result = Process::timeout(120)->run("sudo bash {$script} " . escapeshellarg($domain));

        if ($result->successful()) {
            Log::info("[SSL] Certificate issued for {$domain}: " . $result->output());
        } else {
            Log::error("[SSL] Failed for {$domain}: " . $result->errorOutput());
        }
    }
}
