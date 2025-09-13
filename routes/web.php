<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MenuController;

//ERP
use App\Http\Controllers\BoqController;
use App\Http\Controllers\ProjectListController;
use App\Http\Controllers\CustomerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';

Route::group(['prefix' => 'sgshome', 'middleware' => ['auth', 'verified']], function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/menus', [MenuController::class, 'data'])->name('menus');
});

Route::group(['prefix' => 'erp', 'middleware' => ['auth', 'verified']], function () {
    Route::get('/', function () {
        return Inertia::render('ERP/ERP-gallery');
    })->name('erp');


    Route::group(['prefix' => 'engineering'], function () {
        Route::get('/', function () {
            return Inertia::render('ERP/ERP-engineering');
        })->name('engineering');

        Route::resource('boqs', BoqController::class)
            ->names('boqs')
        ;
    });

    Route::group(['prefix' => 'marketing'], function () {
        Route::get('/', function () {
            return Inertia::render('ERP/ERP-marketing');
        })->name('marketing');

        Route::resource('projectlists', ProjectListController::class)
            ->names('projectlists')
        ;

        Route::resource('customers', CustomerController::class)
            ->names('customers')
        ;
    });
});
