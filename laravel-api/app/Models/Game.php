<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    protected $fillable = ['main_player_id'];

    public function mainPlayer()
    {
        return $this->belongsTo(Player::class, 'main_player_id');
    }

    public function rounds()
    {
        return $this->hasMany(Round::class);
    }
}
