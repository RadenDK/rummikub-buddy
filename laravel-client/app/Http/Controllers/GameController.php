<?php

namespace App\Http\Controllers;

use App\Service\GameStateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\JsonResponse;

class GameController
{
    protected GameStateService $gameStateService;

    public function __construct(GameStateService $gameStateService)
    {
        $this->gameStateService = $gameStateService;
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

        $responseSuccess = $this->gameStateService->saveGame($game);

        if ($responseSuccess) {
            return response()->json(['message' => 'Game saved'], 200);
        } else {
            return response()->json(['message' => 'Game not saved'], 500);
        }
    }
}
