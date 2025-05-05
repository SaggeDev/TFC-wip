<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail //Vamos a implementar una verificacón de mail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'//& AVISO A FUTURO: Esto puede causar errores gravisimos de seguridad, de modo que un usuario pueda hacer un curl y auto-ponerse como admin por mucho csrf que haya en el formulario. De momento está por falta de tiempo ༼ つ ◕_◕ ༽つ.
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function projects()
    {
        return $this->belongsToMany(Project::class)->withTimestamps();
    }


    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function cards()
    {
        return $this->hasMany(Card::class,'user_owner_id');
    }

}
