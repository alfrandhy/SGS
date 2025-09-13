<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\CustomerRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::query()
            ->when(request('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%")
                    ->orWhere('address', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
            'filters' => request()->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customers/Form', [
            'mode' => 'create'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerRequest $request)
    {
        try {
            $data = $request->validated();

            // Handle file upload
            if ($request->hasFile('customer_logo')) {
                $file = $request->file('customer_logo');
                $originalName = $file->getClientOriginalName();
                $fileName = time() . '_' . $originalName;

                $path = $file->storeAs('customer_logos', $fileName, 'public');

                $data['customer_logo'] = $path;
                $data['customer_logo_originalname'] = $originalName;
            }

            $data['created_by'] = auth()->id();
            $data['updated_by'] = auth()->id();

            Customer::create($data);

            return redirect()->route('customers.index')
                ->with('success', 'Customer created successfully.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Customer could not be created.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return Inertia::render('Customers/Show', [
            'customer' => $customer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        return Inertia::render('Customers/Form', [
            'customer' => $customer,
            'mode' => 'edit'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CustomerRequest $request, Customer $customer)
    {
        try {
            $data = $request->validated();

            // Handle file upload
            if ($request->hasFile('customer_logo')) {
                // Delete old file if exists
                if ($customer->customer_logo) {
                    Storage::disk('public')->delete($customer->customer_logo);
                }

                $file = $request->file('customer_logo');
                $originalName = $file->getClientOriginalName();
                $fileName = time() . '_' . $originalName;

                $path = $file->storeAs('customer_logos', $fileName, 'public');

                $data['customer_logo'] = $path;
                $data['customer_logo_originalname'] = $originalName;
            }

            $data['updated_by'] = auth()->id();

            $customer->update($data);

            return redirect()->route('customers.index')
                ->with('success', 'Customer updated successfully.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Customer could not be updated.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        try {
            // Delete logo file if exists
            if ($customer->customer_logo) {
                Storage::disk('public')->delete($customer->customer_logo);
            }

            $customer->delete();

            return redirect()->route('customers.index')
                ->with('success', 'Customer deleted successfully.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Customer could not be deleted.']);
        }
    }
}
