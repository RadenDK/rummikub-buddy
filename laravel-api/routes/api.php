<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', function () {
    return "Api is running";
});

Route::prefix('games')->group(function () {
    Route::get('/{email}', [GameController::class, 'getGames']);
    Route::post('/', [GameController::class, 'saveGame']);
});

Route::prefix('players')->group(function () {
    Route::get('/{email}', [PlayerController::class, 'getNonMainPlayers']);
});
