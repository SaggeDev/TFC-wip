<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use  App\Models\Project;
use  App\Models\User;

class ProjectUser extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'project_user'; 


    public function user()
    {
        return $this->belongsTo(User::class);
    }  
      public function project()
    {
        return $this->belongsTo(Project::class);
    }
    
}

