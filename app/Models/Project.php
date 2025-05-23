<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{

  
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;
    public function tasks()
    {
        return $this->HasMany(Task::class); //? Y asi es como se describe una propiedad 1-n
    }
    public function users()
{
    return $this->belongsToMany(User::class)->withTimestamps();
}

    protected $fillable = ['name', 'description', 'due_date', 'status', 'image', 'project_link','created_by','updated_by'];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by'); //Especifia la relación de 1-n con users y dice que la columna es created by
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by'); //Lo mismo solo que con updated_by
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function projectUsers()
    {
        return $this->hasMany(ProjectUser::class);
    }
    
    
}
