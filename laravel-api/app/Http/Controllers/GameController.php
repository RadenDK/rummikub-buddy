<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{
    public function saveGame(Request $request)
    {

        dd($request);
        return "Game saved";
    }
}
