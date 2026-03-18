<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Members\Domain\Models\Family;
use App\Modules\Members\Domain\Models\Member;
use App\Modules\Ministry\Domain\Models\MinistryArea;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $now = Carbon::now();

        // ── Contadores principales ──
        $totalMembers   = Member::count();
        $activeMembers  = Member::where('is_active', true)->where('member_status', 'activo')->count();
        $totalFamilies  = Family::count();
        $totalAreas     = MinistryArea::where('is_active', true)->count();
        $baptizedCount  = Member::where('is_baptized', true)->count();
        $newThisMonth   = Member::whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->count();

        // ── Miembros por categoría ──
        $byCategory = Member::select('category', DB::raw('count(*) as total'))
            ->groupBy('category')
            ->pluck('total', 'category')
            ->toArray();

        // ── Miembros por estado ──
        $byStatus = Member::select('member_status', DB::raw('count(*) as total'))
            ->groupBy('member_status')
            ->pluck('total', 'member_status')
            ->toArray();

        // ── Crecimiento mensual (últimos 6 meses) ──
        $monthlyGrowth = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = $now->copy()->subMonths($i);
            $count = Member::whereMonth('created_at', $date->month)
                ->whereYear('created_at', $date->year)
                ->count();
            $monthlyGrowth[] = [
                'month' => $date->translatedFormat('M Y'),
                'count' => $count,
            ];
        }

        // ── Miembros por género ──
        $byGender = Member::select('gender', DB::raw('count(*) as total'))
            ->whereNotNull('gender')
            ->groupBy('gender')
            ->pluck('total', 'gender')
            ->toArray();

        // ── Miembros recientes (últimos 5) ──
        $recentMembers = Member::orderByDesc('created_at')
            ->take(5)
            ->get(['id', 'first_name', 'last_name', 'category', 'member_status', 'created_at'])
            ->map(fn (Member $m) => [
                'id'         => $m->id,
                'full_name'  => $m->full_name,
                'category'   => $m->category,
                'status'     => $m->member_status,
                'created_at' => $m->created_at->translatedFormat('d M Y'),
            ]);

        // ── Actividad reciente (últimos 8) ──
        $recentActivity = Activity::orderByDesc('created_at')
            ->take(8)
            ->get(['description', 'subject_type', 'subject_id', 'created_at'])
            ->map(fn (Activity $a) => [
                'description' => $a->description,
                'subject'     => class_basename($a->subject_type ?? ''),
                'subject_id'  => $a->subject_id,
                'date'        => Carbon::parse($a->created_at)->diffForHumans(),
            ]);

        return Inertia::render('Dashboard', [
            'stats' => [
                'total_members'  => $totalMembers,
                'active_members' => $activeMembers,
                'total_families' => $totalFamilies,
                'total_areas'    => $totalAreas,
                'baptized'       => $baptizedCount,
                'new_this_month' => $newThisMonth,
            ],
            'byCategory'     => $byCategory,
            'byStatus'       => $byStatus,
            'byGender'       => $byGender,
            'monthlyGrowth'  => $monthlyGrowth,
            'recentMembers'  => $recentMembers,
            'recentActivity' => $recentActivity,
        ]);
    }
}
