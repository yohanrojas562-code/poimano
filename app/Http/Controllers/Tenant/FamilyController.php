<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Members\Domain\Models\Family;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FamilyController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Family::withCount('members')
            ->when($request->input('search'), function ($q, $search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhere('phone', 'ilike', "%{$search}%");
            })
            ->orderBy('name');

        return Inertia::render('Families/Index', [
            'families' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['search']),
            'stats' => [
                'total' => Family::count(),
                'with_members' => Family::has('members')->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Families/Create');
    }

    public function store(Request $request): RedirectResponse|JsonResponse
    {
        $validated = $request->validate($this->rules());

        $family = Family::create($validated);

        if ($request->wantsJson()) {
            return response()->json(['id' => $family->id, 'name' => $family->name], 201);
        }

        return redirect('/families')->with('success', 'Familia registrada exitosamente.');
    }

    public function show(Family $family): Response
    {
        $family->load('members');

        return Inertia::render('Families/Show', [
            'family' => $family,
        ]);
    }

    public function edit(Family $family): Response
    {
        return Inertia::render('Families/Edit', [
            'family' => $family,
        ]);
    }

    public function update(Request $request, Family $family): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        $family->update($validated);

        return redirect("/families/{$family->id}")->with('success', 'Familia actualizada exitosamente.');
    }

    public function destroy(Family $family): RedirectResponse
    {
        $family->delete();

        return redirect('/families')->with('success', 'Familia eliminada exitosamente.');
    }

    private function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:20'],
            'wedding_date' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
