<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('player_round_score', function (Blueprint $table) {
            $table->id();
            $table->foreignId('round_id')->constrained('rounds');
            $table->foreignId('player_id')->constrained('players');
            $table->integer('player_order');
            $table->integer('score');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_round_score');
    }
};
