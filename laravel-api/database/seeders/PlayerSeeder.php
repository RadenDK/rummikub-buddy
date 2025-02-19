<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Player;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create main players
        $mainPlayer1 = Player::create(['name' => 'Main Player 1', 'email' => 'google@google.com']);
        $mainPlayer2 = Player::create(['name' => 'Main Player 2', 'email' => 'google2@google.com']);

        // Create non-main players belonging to mainPlayer1
        Player::create(['name' => 'Player 1', 'email' => null, 'main_player_id' => $mainPlayer1->id]);
        Player::create(['name' => 'Player 2', 'email' => null, 'main_player_id' => $mainPlayer1->id]);

        // Create non-main players belonging to mainPlayer2
        Player::create(['name' => 'Player 3', 'email' => null, 'main_player_id' => $mainPlayer2->id]);
        Player::create(['name' => 'Player 4', 'email' => null, 'main_player_id' => $mainPlayer2->id]);
    }
}
