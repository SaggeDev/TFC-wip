<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Card extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class, 'user_owner_id'); //Especifia la relación de 1-n con users y dice que la columna relacionada es user_owner_id
    }
    protected $fillable=[
        'user_owner_id',
        'key'
    ];

}
