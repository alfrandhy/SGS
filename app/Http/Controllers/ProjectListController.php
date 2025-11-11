<?php

namespace App\Http\Controllers;

use App\Models\ProjectList;
use App\Models\Customer;
use App\Http\Requests\ProjectListRequest;
use Inertia\Inertia;
use Inertia\Response;

class ProjectListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projectLists = ProjectList::query()
            ->with('customer')
            ->when(request('search'), function ($query, $search) {
                $query->where('projectcode', 'like', "%{$search}%")
                    ->orWhere('descriptionwork', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->when(request('customer'), function ($query, $customer) {
                $query->where('customer_code', $customer);
            })
            ->when(request('category'), function ($query, $category) {
                $query->where('projectcategory', $category);
            })
            ->when(request('year'), function ($query, $year) {
                $query->where('year', $year);
            })
            ->when(request('month'), function ($query, $month) {
                $query->where('month', $month);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Group projects by year for sidebar
        $groupedByYear = ProjectList::select('year')
            ->selectRaw('count(*) as total')
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->get()
            ->pluck('total', 'year')
            ->toArray();

        $customers = Customer::select('code', 'name')->orderBy('name')->get();

        return Inertia::render('ProjectLists/Index', [
            'projectLists' => $projectLists,
            'customers' => $customers,
            'groupedByYear' => $groupedByYear,
            'filters' => request()->only(['search', 'customer', 'category', 'year', 'month'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = Customer::select('code', 'name')->orderBy('name')->get();

        return Inertia::render('ProjectLists/Form', [
            'mode' => 'create',
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectListRequest $request)
    {
        $validated = $request->validated();

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();

        ProjectList::create($validated);

        return redirect()->route('projectlists.index')
            ->with('success', 'Project created successfully.');
    }

    // Other methods...

    /**
     * Display the specified resource.
     */
    public function show(ProjectList $projectList)
    {
        $projectList->load('customer');

        return Inertia::render('ProjectLists/Show', [
            'projectList' => $projectList
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProjectList $projectList)
    {
        $customers = Customer::select('code', 'name')->orderBy('name')->get();

        return Inertia::render('ProjectLists/Form', [
            'projectList' => $projectList,
            'customers' => $customers,
            'mode' => 'edit'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectListRequest $request, ProjectList $projectList)
    {
        $validated = $request->validated();

        $validated['updated_by'] = auth()->id();

        $projectList->update($validated);

        return redirect()->route('projectlists.index')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectList $projectList)
    {
        try {
            $projectList->delete();

            return redirect()->route('projectlists.index')
                ->with('success', 'Project deleted successfully.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Project could not be deleted.']);
        }
    }
}
