<?php

namespace App\Http\Controllers;

use App\Service\PlayerService;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class LoginController
{

    protected PlayerService $playerService;

    public function __construct(PlayerService $playerService)
    {
        $this->playerService = $playerService;
    }

    public function index(Request $request)
    {
        // Check if the user session exists
        if ($request->session()->has('google_user')) {
            // If the user session exists, redirect to the dashboard
            return redirect('/dashboard');
        }

        // Otherwise, redirect to the login page
        return redirect('/login');
    }

    public function showLoginForm(Request $request)
    {
        // Clear the session
        $request->session()->forget('google_user');

        // Show the login view
        return view('login');
    }


    // Redirect to Google's OAuth page
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    // Handle Google's callback
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            // Store the user in the session
            session([
                'google_user' => [
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'avatar' => $googleUser->getAvatar(),
                ]
            ]);

            $this->playerService->saveMainPlayer($googleUser->getEmail(), $googleUser->getName());

            // Redirect to the dashboard view
            return redirect('/dashboard');
        } catch (\Exception $e) {
            return redirect('/')->with('error', 'Failed to log in with Google.');
        }
    }
}
