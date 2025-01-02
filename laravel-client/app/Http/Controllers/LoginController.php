<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    // Show the login page
    public function index()
    {
        return view('login'); // Show the login view
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

            // Redirect to the dashboard view
            return redirect('/dashboard');
        } catch (\Exception $e) {
            return redirect('/')->with('error', 'Failed to log in with Google.');
        }
    }
}
