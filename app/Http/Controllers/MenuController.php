<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controller;
use App\Models\Menu;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menus = Menu::whereNull('parent_id')
            ->with('children')
            ->orderBy('order')
            ->get()
        ;
        return response()->json([
            'status' => 'success',
            'menus' => $menus
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function data()
    {
        $menus = Menu::whereNull('parent_id')
            ->with('children')
            ->orderBy('order')
            ->get()
        ;

        return Inertia::render('MenuAdmin', [
            'menus' => $menus,
            'title' => 'Menu Admin',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    // {
    //     // Validate the incoming request data
    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'description' => 'nullable|string|max:500',
    //         'parent_id' => 'nullable|exists:menus,id',
    //         'order' => 'nullable|integer|min:0',
    //         'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    //         'url' => 'nullable|url|max:255',
    //         'is_active' => 'boolean',
    //     ]);

    //     // Initialize the image path
    //     $imagePath = null;

    //     // Handle the file upload if an icon is provided
    //     if ($request->hasFile('icon')) {
    //         $imagePath = $request->file('icon')->store('menuicon', 'public');
    //     }

    //     try {
    //         // Create the menu entry in the database
    //         Menu::create([
    //             'name' => $validatedData['name'],
    //             'description' => $validatedData['description'],
    //             'parent_id' => $validatedData['parent_id'],
    //             'order' => $validatedData['order'] ?? 0,
    //             'icon' => $imagePath,
    //             'url' => $validatedData['url'],
    //             'is_active' => $validatedData['is_active'] ?? false,
    //             'created_by' => auth()->user()->id ?? null,
    //             'updated_by' => auth()->user()->id ?? null,
    //         ]);
    //     } catch (\Exception $e) {
    //         // Log the error for debugging
    //         \Log::error('Menu creation failed: ' . $e->getMessage());
    //         return back()->withErrors(['error' => 'Menu could not be created.']);
    //     }

    //     // Redirect back with a success message
    //     return redirect()->route('menu')->with('success', 'Menu created successfully.');
    // }
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'parent_id' => 'nullable|exists:menus,id',
            'order' => 'nullable|integer|min:0',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'url' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:255',
            'updated_by' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Handle icon upload
        if ($request->hasFile('icon')) {
            $path = $request->file('icon')->store('public/menu-icons');
            $data['icon'] = Storage::url($path);
        }

        $menu = Menu::create($data);

        return response()->json([
            'status' => 'success',
            'menu' => $menu
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'parent_id' => 'nullable|exists:menus,id',
            'order' => 'nullable|integer|min:0',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'url' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'created_by' => 'nullable|string|max:255',
            'updated_by' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        // Handle icon update
        if ($request->hasFile('icon')) {
            // Delete old icon if exists
            if ($menu->icon) {
                $oldPath = str_replace('/storage', 'public', $menu->icon);
                Storage::delete($oldPath);
            }
            
            $path = $request->file('icon')->store('public/menu-icons');
            $data['icon'] = Storage::url($path);
        }

        $menu->update($data);

        return response()->json([
            'status' => 'success',
            'menu' => $menu
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        // Delete icon if exists
        if ($menu->icon) {
            $path = str_replace('/storage', 'public', $menu->icon);
            Storage::delete($path);
        }

        $menu->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Menu deleted successfully'
        ]);
    }
}
