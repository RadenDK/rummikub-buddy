<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call the custom seeders
        $this->call([
            PlayerSeeder::class,
            GameSeeder::class,
            RoundSeeder::class,
            PlayerRoundScoreSeeder::class,
        ]);

        // Optionally, you can keep the user factory seeder
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
