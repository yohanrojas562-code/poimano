<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Members\Domain\Models\Family;
use App\Modules\Members\Domain\Models\Member;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MemberController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Member::with('family')
            ->when($request->input('search'), function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('first_name', 'ilike', "%{$search}%")
                      ->orWhere('last_name', 'ilike', "%{$search}%")
                      ->orWhere('email', 'ilike', "%{$search}%")
                      ->orWhere('phone', 'ilike', "%{$search}%");
                });
            })
            ->when($request->input('status'), fn ($q, $s) => $q->where('member_status', $s))
            ->when($request->input('category'), fn ($q, $c) => $q->where('category', $c))
            ->orderBy('first_name');

        return Inertia::render('Members/Index', [
            'members' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['search', 'status', 'category']),
            'stats' => [
                'total' => Member::count(),
                'active' => Member::where('member_status', 'activo')->count(),
                'baptized' => Member::where('is_baptized', true)->count(),
                'new_this_month' => Member::whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Members/Create', [
            'families' => Family::orderBy('name')->get(['id', 'name']),
            'membersForRef' => Member::active()
                ->orderBy('first_name')
                ->get(['id', 'first_name', 'last_name']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        Member::create($validated);

        return redirect('/members')->with('success', 'Miembro registrado exitosamente.');
    }

    public function show(Member $member): Response
    {
        $member->load(['family.members', 'skills', 'history.changedByUser', 'referredBy', 'referrals']);

        return Inertia::render('Members/Show', [
            'member' => $member,
        ]);
    }

    public function edit(Member $member): Response
    {
        return Inertia::render('Members/Edit', [
            'member' => $member,
            'families' => Family::orderBy('name')->get(['id', 'name']),
            'membersForRef' => Member::active()
                ->where('id', '!=', $member->id)
                ->orderBy('first_name')
                ->get(['id', 'first_name', 'last_name']),
        ]);
    }

    public function update(Request $request, Member $member): RedirectResponse
    {
        $validated = $request->validate($this->rules());

        $member->update($validated);

        return redirect("/members/{$member->id}")->with('success', 'Miembro actualizado exitosamente.');
    }

    public function destroy(Member $member): RedirectResponse
    {
        $member->delete();

        return redirect('/members')->with('success', 'Miembro eliminado exitosamente.');
    }

    private function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'second_last_name' => ['nullable', 'string', 'max:255'],
            'gender' => ['required', 'in:masculino,femenino'],
            'birth_date' => ['nullable', 'date'],
            'blood_type' => ['nullable', 'string', 'max:5'],
            'marital_status' => ['nullable', 'in:soltero,casado,viudo,divorciado,union_libre'],
            'nationality' => ['nullable', 'string', 'max:255'],
            'document_type' => ['nullable', 'string', 'max:20'],
            'document_number' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'mobile' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'city' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'max:255'],
            'zip_code' => ['nullable', 'string', 'max:15'],
            'country_id' => ['nullable', 'integer'],
            'member_status' => ['required', 'in:activo,inactivo,transferido,fallecido,excomunicado'],
            'category' => ['required', 'in:nuevo_creyente,creyente,lider,pastor,misionero'],
            'is_baptized' => ['boolean'],
            'baptism_date' => ['nullable', 'date'],
            'baptism_church' => ['nullable', 'string', 'max:255'],
            'conversion_date' => ['nullable', 'date'],
            'membership_date' => ['nullable', 'date'],
            'how_arrived' => ['nullable', 'string', 'max:255'],
            'referred_by_id' => ['nullable', 'integer', 'exists:members,id'],
            'family_id' => ['nullable', 'integer', 'exists:families,id'],
            'family_role' => ['nullable', 'in:cabeza,esposa,hijo,otro'],
            'notes' => ['nullable', 'string'],
            'is_active' => ['boolean'],
        ];
    }
}
