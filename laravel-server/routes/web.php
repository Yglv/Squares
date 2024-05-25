<?php

use App\Http\Controllers\FutureMeetupController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('main');

Route::get('/room/{id}', function () {
    return Inertia::render('Room/Room');
})->name('room');

Route::controller(FutureMeetupController::class)->prefix('meetups')->group(function () {
    Route::get('/', 'index')->name('meetups.index');
    Route::post('/', 'store')->name('meetups.store');
    Route::delete('/{id}', 'destroy')->name('meetups.destroy');
    Route::patch('/{id}', 'update')->name('meetups.update');
})->middleware(['auth', 'verified'])->name('meetups');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
