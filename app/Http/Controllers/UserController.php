<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;


class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::paginate(10),
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        try {
            $validatedData['password'] = bcrypt($validatedData['password']);
            User::create($validatedData);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'User could not be created.']);
        }

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }
}
