<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Middleware\CheckLogin;

Route::get('/', [LoginController::class, 'index'])->name('login');
Route::get('auth/google', [LoginController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [LoginController::class, 'handleGoogleCallback']);


Route::get('/dashboard', function () {
    $user = session('google_user');
    return view('dashboard', ['userName' => $user['name']]);
})->middleware(CheckLogin::class);

