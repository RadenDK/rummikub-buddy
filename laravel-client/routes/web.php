<?php

use App\Http\Controllers\GameStateController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Middleware\CheckLogin;

Route::get('/', [LoginController::class, 'index']);

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');

Route::get('/dashboard', function () {
    $user = session('google_user');
    return view('dashboard', ['userName' => $user['name']]);
})->middleware(CheckLogin::class);


Route::get('auth/google', [LoginController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [LoginController::class, 'handleGoogleCallback']);


Route::post('/save-game-state', [GameStateController::class, 'saveGame']);
