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
        $mainPlayer1 = Player::create(['name' => 'Main Player 1', 'google_id' => 'google1']);
        $mainPlayer2 = Player::create(['name' => 'Main Player 2', 'google_id' => 'google2']);

        // Create non-main players belonging to mainPlayer1
        Player::create(['name' => 'Player 1', 'google_id' => null, 'main_player_id' => $mainPlayer1->id]);
        Player::create(['name' => 'Player 2', 'google_id' => null, 'main_player_id' => $mainPlayer1->id]);

        // Create non-main players belonging to mainPlayer2
        Player::create(['name' => 'Player 3', 'google_id' => null, 'main_player_id' => $mainPlayer2->id]);
        Player::create(['name' => 'Player 4', 'google_id' => null, 'main_player_id' => $mainPlayer2->id]);
    }
}
