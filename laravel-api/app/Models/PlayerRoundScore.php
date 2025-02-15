<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerRoundScore extends Model
{
    use HasFactory;

    protected $fillable = ['round_id', 'player_id', 'player_order', 'score'];

    public function round()
    {
        return $this->belongsTo(Round::class);
    }

    public function player()
    {
        return $this->belongsTo(Player::class);
    }
}
