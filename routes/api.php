<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\BoqController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'menus'], function () {
    Route::get('/', [MenuController::class, 'index'])->name('api.menus.index');
    Route::post('/', [MenuController::class, 'store'])->name('api.menus.store');
    Route::patch('/{menu}', [MenuController::class, 'update'])->name('api.menus.update');
    Route::delete('/{menu}', [MenuController::class, 'destroy'])->name('api.menus.destroy');
});

Route::prefix('boqs')->group(function () {
    Route::get('/', [BoqController::class, 'index']);
    Route::post('/', [BoqController::class, 'store']);
    Route::get('/{partno}', [BoqController::class, 'show']);
    Route::put('/{partno}', [BoqController::class, 'update']);
    Route::delete('/{partno}', [BoqController::class, 'destroy']);
});
