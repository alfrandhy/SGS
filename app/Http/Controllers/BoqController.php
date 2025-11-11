<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Boq;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\BoqRequest;
use Illuminate\Support\Facades\Validator;

class BoqController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $project = $request->get('project');

        $query = Boq::query();

        // Filter by project if specified
        if ($project) {
            $query->where('projectcode', $project);
        }

        // Apply search filter
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('boqcode', 'like', "%{$search}%")
                  ->orWhere('projectcode', 'like', "%{$search}%")
                  ->orWhere('partno', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('type', 'like', "%{$search}%");
            });
        }

        // Order by project code first
        $query->orderBy('projectcode')->orderBy('boqcode');

        $boqs = $query->paginate(10);

        // Group by project code
        $groupedBoqs = [];
        foreach ($boqs->items() as $boq) {
            $projectCode = $boq->projectcode;
            if (!isset($groupedBoqs[$projectCode])) {
                $groupedBoqs[$projectCode] = [
                    'project_code' => $projectCode,
                    'items' => []
                ];
            }
            $groupedBoqs[$projectCode]['items'][] = $boq;
        }

        return Inertia::render('Boqs/BoqIndex-responsive', [
            'boqs' => $boqs,
            'grouped_boqs' => $groupedBoqs,
            'filters' => [
                'search' => $search,
                'project' => $project
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Boqs/BoqForm');
    }

    public function store(BoqRequest $request)
    {
        try {
            $validated = $request->validated();
            $validated['boqcode'] = $validated['projectcode'] . '-' . $validated['partno'];
            $validated['created_by'] = auth()->id();
            $validated['updated_by'] = auth()->id();

            Boq::create($validated);

            return redirect()->route('boqs.index')->with('success', 'Boq created successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Boq could not be created.']);
        }
    }

    public function show(Boq $boq)
    {
        return Inertia::render('Boqs/BoqDetail', ['boq' => $boq]);
    }

    public function edit(Boq $boq)
    {
        return Inertia::render('Boqs/BoqForm', ['boq' => $boq]);
    }

    public function update(BoqRequest $request, Boq $boq)
    {
        try {
            $validated = $request->validated();
            $validated['boqcode'] = $validated['projectcode'] . '-' . $validated['partno'];
            $validated['updated_by'] = auth()->id();

            $boq->update($validated);

            return redirect()->route('boqs.index')->with('success', 'Boq updated successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Boq could not be updated.']);
        }
    }

    public function destroy(Boq $boq)
    {
        $boq->delete();
        return redirect()->route('boqs.index');
    }
}
