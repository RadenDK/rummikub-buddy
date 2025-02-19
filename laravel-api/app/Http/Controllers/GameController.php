<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Player;
use App\Models\PlayerRoundScore;
use App\Models\Round;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GameController extends Controller
{

    public function getGames(string $email): JsonResponse
    {
        $player = Player::where('email', $email)->first();

        if (is_null($player)) {
            return response()->json(['message' => 'Player not found'], 404);
        }

        $games = Game::where('main_player_id', $player->id)
            ->with(['rounds.playerRoundScores.player'])
            ->get();

        return response()->json($games);
    }

    public function saveGame(Request $request): JsonResponse
    {
        $gameData = $request->input()['gameState'];

        $playersData = $gameData['players'];
        $roundsData = $gameData['rounds'];


        // Iterate over the players to first find the main player
        foreach ($playersData as $playerData) {
            if (isset($playerData['email'])) {
                $mainPlayer = Player::firstOrCreate([
                    'email' => $playerData['email'],
                    'name' => $playerData['name'],
                ]);
                break;
            }
        }

        $players = [];
        if (isset($mainPlayer)) {
            foreach ($playersData as $playerData) {
                if (!isset($playerData['email'])) {
                    $player = Player::firstOrCreate([
                        'name' => $playerData['name'],
                        'main_player_id' => $mainPlayer->id,
                    ]);
                    $players[] = $player;
                } else {
                    $players[] = $mainPlayer;
                }
            }
        }

        // Create a new game
        $game = Game::create(['main_player_id' => $mainPlayer->id]);

        // Create rounds and save scores
        foreach ($roundsData as $roundIndex => $scores) {
            $round = Round::create(['game_id' => $game->id]);

            foreach ($scores as $playerIndex => $score) {
                PlayerRoundScore::create([
                    'round_id' => $round->id,
                    'player_id' => $players[$playerIndex]->id,
                    'player_order' => $playerIndex,
                    'score' => $score
                ]);
            }
        }

        return response()->json(['message' => 'Game saved successfully']);
    }
}
