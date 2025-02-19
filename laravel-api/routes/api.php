<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/', function () {
    return "Api is running";
});

Route::get('/games/{email}', [GameController::class, 'getGames']);

Route::post('/games', [GameController::class, 'saveGame']);
