<?php

namespace App\Http\Controllers;

use App\Service\GameService;
use App\Service\PlayerService;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class GameController
{
    protected GameService $gameStateService;
    protected PlayerService $playerService;

    public function __construct(GameService $gameStateService, PlayerService $playerService)
    {
        $this->gameStateService = $gameStateService;
        $this->playerService = $playerService;
    }

    public function showDashboard(Request $request): View|Application|Factory
    {
        $user = $request->session()->get('google_user');

        $listOfPriorUsedPlayers = $this->playerService->getListOfPriorUsedPlayers($user['email']);

        return view('dashboard', ['userName' => $user['name'], 'listOfPriorUsedPlayers' => $listOfPriorUsedPlayers]);
    }

    public function saveGame(Request $request): JsonResponse
    {
        $game = $request->input('gameState');
        $googleUserEmail = session('google_user')['email'];

        // Update the players array
        foreach ($game['players'] as &$player) {
            if ($player['isMain']) {
                $player['email'] = $googleUserEmail;
            }
            unset($player['isMain']);
        }

        $responseSuccess = $this->gameStateService->saveGame(email: $googleUserEmail, gameState: $game);

        if ($responseSuccess) {
            return response()->json(['message' => 'Game saved'], 200);
        } else {
            return response()->json(['message' => 'Game not saved'], 500);
        }
    }
}
