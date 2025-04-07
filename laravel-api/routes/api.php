<?php

use App\Http\Controllers\ApiGameController;
use App\Http\Controllers\PlayerController;
use App\Http\Middleware\ValidateApiKey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', function () {
    return "Api is running";
});

Route::middleware(ValidateApiKey::class)->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

    Route::prefix('games')->group(function () {
        Route::get('/{email}', [ApiGameController::class, 'getGames']);
        Route::post('/{email}', [ApiGameController::class, 'saveGame']);
    });

    Route::prefix('players')->group(function () {
        Route::get('/{email}', [PlayerController::class, 'getNonMainPlayers']);
        Route::post('/', [PlayerController::class, 'saveMainPlayer']);
    });
});
