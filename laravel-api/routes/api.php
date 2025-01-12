<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MatchController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/', function () {
    return "Api is running";
});

//Route::post('/match', [MatchController::class, 'saveMatch'])->middleware(ValidateApiKey::class);
Route::post('/match', [MatchController::class, 'saveMatch']);
