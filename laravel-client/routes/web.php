<?php

use App\Http\Controllers\ClientGameController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Middleware\CheckLogin;

Route::get('/', [LoginController::class, 'index']);

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');


Route::get('/dashboard', [ClientGameController::class, 'showDashboard'])->middleware(CheckLogin::class);


Route::get('auth/google', [LoginController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [LoginController::class, 'handleGoogleCallback']);


Route::post('/save-game-state', [ClientGameController::class, 'saveGame']);
