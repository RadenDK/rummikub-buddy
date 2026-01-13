<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

class ClientGameController
{
    public function showDashboard(Request $request): View|Application|Factory
    {
        return view('dashboard');
    }
}
