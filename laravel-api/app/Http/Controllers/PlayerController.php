<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveMainPlayerRequest;
use App\Models\Player;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Request;

class PlayerController
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

    public function saveMainPlayer(SaveMainPlayerRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Check if the player already exists
        $player = Player::where('email', $data['email'])->first();

        if (is_null($player)) {
            $player = Player::create([
                'email' => $data['email'],
                'name' => $data['name'],
            ]);
        }

        return response()->json($player);
    }
}
