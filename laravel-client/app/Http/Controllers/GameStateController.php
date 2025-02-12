<?php

namespace App\Http\Controllers;

use App\Service\GameStateService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class GameStateController extends Controller
{
    protected GameStateService $gameStateService;

    public function __construct(GameStateService $gameStateService)
    {
        $this->gameStateService = $gameStateService;
    }

    public function saveGame(Request $request): JsonResponse
    {
        $game = $request->input('gameState');
        $responseSuccess = $this->gameStateService->saveGame($game);

        if ($responseSuccess) {
            return response()->json(['message' => 'Game saved'], 200);
        } else {
            return response()->json(['message' => 'Game not saved'], 500);
        }
    }
}
