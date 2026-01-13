<?php

use App\Http\Controllers\ClientGameController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ClientGameController::class, 'showDashboard']);

Route::get('/dashboard', [ClientGameController::class, 'showDashboard']);
