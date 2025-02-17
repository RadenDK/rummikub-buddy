<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Round;
use App\Models\Game;

class RoundSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Retrieve games
        $game1 = Game::where('main_player_id', 1)->first();
        $game2 = Game::where('main_player_id', 2)->first();

        // Create rounds for game1
        Round::create(['game_id' => $game1->id]);
        Round::create(['game_id' => $game1->id]);

        // Create rounds for game2
        Round::create(['game_id' => $game2->id]);
        Round::create(['game_id' => $game2->id]);
    }
}
