<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Groups\Domain\Models\CellGroup;
use App\Modules\Groups\Domain\Models\CellGroupAttendee;
use App\Modules\Members\Domain\Models\Member;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CellGroupController extends Controller
{
    public function index(Request $request): Response
    {
        $query = CellGroup::with(['hostMember', 'attendees.member'])
            ->withCount('attendees')
            ->when($request->input('search'), function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('name', 'ilike', "%{$search}%")
                      ->orWhere('address', 'ilike', "%{$search}%")
                      ->orWhere('host_name', 'ilike', "%{$search}%");
                });
            })
            ->when($request->input('status'), function ($q, $status) {
                $q->where('is_active', $status === 'active');
            })
            ->orderByDesc('opening_date');

        return Inertia::render('Groups/Index', [
            'groups' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['search', 'status']),
            'stats' => [
                'total' => CellGroup::count(),
                'active' => CellGroup::where('is_active', true)->count(),
                'attendees' => CellGroupAttendee::count(),
                'new_this_month' => CellGroup::whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Groups/Create', [
            'members' => Member::active()
                ->orderBy('first_name')
                ->get(['id', 'first_name', 'last_name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        $group = CellGroup::create($validated);

        $this->syncAttendees($group, $request->input('attendees', []));

        return redirect('/groups')->with('success', 'Grupo celular creado exitosamente.');
    }

    public function show(CellGroup $group): Response
    {
        $group->load(['hostMember', 'attendees.member']);

        return Inertia::render('Groups/Show', [
            'group' => $group,
        ]);
    }

    public function edit(CellGroup $group): Response
    {
        $group->load(['hostMember', 'attendees.member']);

        return Inertia::render('Groups/Edit', [
            'group' => $group,
            'members' => Member::active()
                ->orderBy('first_name')
                ->get(['id', 'first_name', 'last_name']),
        ]);
    }

    public function update(Request $request, CellGroup $group): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        $group->update($validated);

        $this->syncAttendees($group, $request->input('attendees', []));

        return redirect("/groups/{$group->id}")->with('success', 'Grupo celular actualizado exitosamente.');
    }

    public function destroy(CellGroup $group): RedirectResponse
    {
        $group->delete();

        return redirect('/groups')->with('success', 'Grupo celular eliminado exitosamente.');
    }

    private function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'opening_date' => ['required', 'date'],
            'address' => ['required', 'string'],
            'host_type' => ['required', 'in:member,external'],
            'host_member_id' => ['nullable', 'required_if:host_type,member', 'integer', 'exists:members,id'],
            'host_name' => ['nullable', 'required_if:host_type,external', 'string', 'max:255'],
            'host_phone' => ['nullable', 'string', 'max:20'],
            'notes' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ];
    }

    private function syncAttendees(CellGroup $group, array $attendees): void
    {
        $group->attendees()->delete();

        foreach ($attendees as $attendee) {
            if (empty($attendee['type'])) {
                continue;
            }

            $group->attendees()->create([
                'type' => $attendee['type'],
                'member_id' => $attendee['type'] === 'member' ? ($attendee['member_id'] ?? null) : null,
                'name' => $attendee['type'] === 'external' ? ($attendee['name'] ?? null) : null,
                'phone' => $attendee['phone'] ?? null,
            ]);
        }
    }
}
