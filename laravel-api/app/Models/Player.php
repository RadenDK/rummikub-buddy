<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'google_id', 'main_player_id'];

    public function mainPlayer()
    {
        return $this->belongsTo(Player::class, 'main_player_id');
    }

    public function gamePlayers()
    {
        return $this->hasMany(Player::class, 'main_player_id');
    }

    public function games()
    {
        return $this->hasMany(Game::class, 'main_player_id');
    }

    public function rounds()
    {
        return $this->belongsToMany(Round::class, 'player_round_scores')->withPivot('player_order', 'score')->withTimestamps();
    }
}
