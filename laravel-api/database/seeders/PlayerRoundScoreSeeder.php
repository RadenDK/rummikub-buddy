<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PlayerRoundScore;
use App\Models\Round;
use App\Models\Game;
use App\Models\Player;

class PlayerRoundScoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Retrieve all games
        $games = Game::all();

        // Retrieve all players
        $players = Player::all();

        foreach ($games as $game) {
            // Retrieve rounds for the current game
            $rounds = Round::where('game_id', $game->id)->get();

            foreach ($rounds as $round) {
                // Assign player round scores for each round
                foreach ($players as $index => $player) {
                    PlayerRoundScore::create([
                        'round_id' => $round->id,
                        'player_id' => $player->id,
                        'player_order' => $index + 1,
                        'score' => rand(10, 100) // Example score, you can adjust as needed
                    ]);
                }
            }
        }
    }
}
