<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    public function userID(){
        return $this->belongsTo(User::class, 'user_owner_id'); //Especifia la relación de 1-n con users y dice que la columna relacionada es user_owner_id
    }
}
