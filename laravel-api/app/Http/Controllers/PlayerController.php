<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\JsonResponse;

class PlayerController extends Controller
{
    public function getNonMainPlayers(string $email): JsonResponse
    {
        $player = Player::where('email', $email)->first();

        if (is_null($player)) {
            return response()->json(['message' => 'Player not found'], 404);
        }

        $players = Player::where('main_player_id', $player->id)
            ->select('id', 'name')
            ->get();

        return response()->json($players);
    }
}
