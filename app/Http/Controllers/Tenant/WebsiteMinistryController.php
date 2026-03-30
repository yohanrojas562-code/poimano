<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Website\Domain\Models\WebsiteMinistry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class WebsiteMinistryController extends Controller
{
    /* ── Admin: list all ministries for the website admin panel ── */
    public function index()
    {
        return WebsiteMinistry::orderBy('sort_order')->get();
    }

    /* ── Admin: create / update a ministry ── */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'icon'        => ['nullable', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:1000'],
            'content'     => ['nullable', 'string'],
            'is_visible'  => ['boolean'],
            'sort_order'  => ['integer'],
        ]);

        $data['slug'] = Str::slug($data['name']);
        $data['icon'] = $data['icon'] ?: 'heart';

        $ministry = WebsiteMinistry::create($data);

        return redirect()->back()->with('success', 'Ministerio creado correctamente.');
    }

    public function update(Request $request, WebsiteMinistry $ministry)
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'icon'        => ['nullable', 'string', 'max:50'],
            'description' => ['nullable', 'string', 'max:1000'],
            'content'     => ['nullable', 'string'],
            'is_visible'  => ['boolean'],
            'sort_order'  => ['integer'],
        ]);

        $data['icon'] = $data['icon'] ?: 'heart';
        $ministry->update($data);

        return redirect()->back()->with('success', 'Ministerio actualizado correctamente.');
    }

    public function destroy(WebsiteMinistry $ministry)
    {
        // Clean up images
        $this->deleteMinistryFiles($ministry);
        $ministry->delete();

        return redirect()->back()->with('success', 'Ministerio eliminado.');
    }

    /* ── Image upload (main image) ── */
    public function uploadImage(Request $request, WebsiteMinistry $ministry)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $tenantId = tenant()->id;
        $baseDir  = base_path('storage/app/public') . '/website-ministries/' . $tenantId;
        File::ensureDirectoryExists($baseDir);

        // Delete old
        if ($ministry->image) {
            $old = base_path('storage/app/public') . '/' . ltrim($ministry->image, '/');
            if (File::exists($old)) {
                File::delete($old);
            }
        }

        $file     = $request->file('image');
        $filename = 'ministry-' . $ministry->id . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move($baseDir, $filename);

        $ministry->update(['image' => 'website-ministries/' . $tenantId . '/' . $filename]);

        return redirect()->back()->with('success', 'Imagen actualizada.');
    }

    public function removeImage(WebsiteMinistry $ministry)
    {
        if ($ministry->image) {
            $path = base_path('storage/app/public') . '/' . ltrim($ministry->image, '/');
            if (File::exists($path)) {
                File::delete($path);
            }
            $ministry->update(['image' => null]);
        }

        return redirect()->back()->with('success', 'Imagen eliminada.');
    }

    /* ── Gallery ── */
    public function uploadGalleryImage(Request $request, WebsiteMinistry $ministry)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
        ]);

        $tenantId = tenant()->id;
        $baseDir  = base_path('storage/app/public') . '/website-ministries/' . $tenantId . '/gallery';
        File::ensureDirectoryExists($baseDir);

        $file     = $request->file('image');
        $filename = 'gallery-' . $ministry->id . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move($baseDir, $filename);

        $gallery   = $ministry->gallery ?? [];
        $gallery[] = 'website-ministries/' . $tenantId . '/gallery/' . $filename;
        $ministry->update(['gallery' => $gallery]);

        return redirect()->back()->with('success', 'Imagen agregada a la galería.');
    }

    public function removeGalleryImage(Request $request, WebsiteMinistry $ministry)
    {
        $request->validate([
            'index' => ['required', 'integer', 'min:0'],
        ]);

        $gallery = $ministry->gallery ?? [];
        $index   = $request->input('index');

        if (isset($gallery[$index])) {
            $path = base_path('storage/app/public') . '/' . ltrim($gallery[$index], '/');
            if (File::exists($path)) {
                File::delete($path);
            }
            array_splice($gallery, $index, 1);
            $ministry->update(['gallery' => array_values($gallery)]);
        }

        return redirect()->back()->with('success', 'Imagen eliminada de la galería.');
    }

    /* ── Sync from MinistryAreas ── */
    public function syncFromAreas()
    {
        if (! \Illuminate\Support\Facades\Schema::hasTable('ministry_areas')) {
            return redirect()->back()->with('error', 'No hay áreas ministeriales configuradas.');
        }

        $areas = \App\Modules\Ministry\Domain\Models\MinistryArea::active()
            ->orderBy('name')
            ->get();

        foreach ($areas as $i => $area) {
            WebsiteMinistry::firstOrCreate(
                ['slug' => Str::slug($area->name)],
                [
                    'name'        => $area->name,
                    'icon'        => 'heart',
                    'description' => $area->description,
                    'sort_order'  => $i,
                ]
            );
        }

        return redirect()->back()->with('success', 'Ministerios sincronizados desde Áreas Ministeriales.');
    }

    /* ── Helpers ── */
    private function deleteMinistryFiles(WebsiteMinistry $ministry): void
    {
        if ($ministry->image) {
            $path = base_path('storage/app/public') . '/' . ltrim($ministry->image, '/');
            if (File::exists($path)) {
                File::delete($path);
            }
        }

        foreach ($ministry->gallery ?? [] as $img) {
            $path = base_path('storage/app/public') . '/' . ltrim($img, '/');
            if (File::exists($path)) {
                File::delete($path);
            }
        }
    }
}
