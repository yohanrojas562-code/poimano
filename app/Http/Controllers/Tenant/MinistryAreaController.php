<?php
declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Members\Domain\Models\Member;
use App\Modules\Ministry\Domain\Models\MinistryArea;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MinistryAreaController extends Controller
{
    public function index(Request $request): Response
    {
        $query = MinistryArea::with(['coordinator', 'consolidator', 'spiritual', 'evangelism'])
            ->when($request->input('search'), function ($q, $search) {
                $q->where('name', 'ilike', "%{$search}%");
            })
            ->orderBy('name');

        return Inertia::render('MinistryAreas/Index', [
            'areas' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['search']),
            'stats' => [
                'total' => MinistryArea::count(),
                'active' => MinistryArea::where('is_active', true)->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('MinistryAreas/Create', [
            'leaders' => $this->getLeaders(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        MinistryArea::create($validated);

        return redirect('/ministry-areas')->with('success', 'Área ministerial creada exitosamente.');
    }

    public function show(MinistryArea $ministryArea): Response
    {
        $ministryArea->load(['coordinator', 'consolidator', 'spiritual', 'evangelism']);

        return Inertia::render('MinistryAreas/Show', [
            'area' => $ministryArea,
        ]);
    }

    public function edit(MinistryArea $ministryArea): Response
    {
        return Inertia::render('MinistryAreas/Edit', [
            'area' => $ministryArea,
            'leaders' => $this->getLeaders(),
        ]);
    }

    public function update(Request $request, MinistryArea $ministryArea): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        $ministryArea->update($validated);

        return redirect("/ministry-areas/{$ministryArea->id}")->with('success', 'Área ministerial actualizada exitosamente.');
    }

    public function destroy(MinistryArea $ministryArea): RedirectResponse
    {
        $ministryArea->delete();

        return redirect('/ministry-areas')->with('success', 'Área ministerial eliminada exitosamente.');
    }

    private function getLeaders(): \Illuminate\Support\Collection
    {
        return Member::where('category', 'lider')
            ->where('is_active', true)
            ->where('member_status', 'activo')
            ->orderBy('first_name')
            ->get(['id', 'first_name', 'last_name']);
    }

    private function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'coordinator_id' => ['nullable', 'integer', 'exists:members,id'],
            'consolidator_id' => ['nullable', 'integer', 'exists:members,id'],
            'spiritual_id' => ['nullable', 'integer', 'exists:members,id'],
            'evangelism_id' => ['nullable', 'integer', 'exists:members,id'],
            'is_active' => ['boolean'],
        ];
    }
}
