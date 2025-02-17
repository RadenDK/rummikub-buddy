<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Game;
use App\Models\Player;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Retrieve main players
        $mainPlayer1 = Player::where('name', 'Main Player 1')->first();
        $mainPlayer2 = Player::where('name', 'Main Player 2')->first();

        // Create games for mainPlayer1
        Game::create(['main_player_id' => $mainPlayer1->id]);
        Game::create(['main_player_id' => $mainPlayer1->id]);

        // Create games for mainPlayer2
        Game::create(['main_player_id' => $mainPlayer2->id]);
        Game::create(['main_player_id' => $mainPlayer2->id]);
    }
}
