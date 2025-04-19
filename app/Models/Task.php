<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;
    public function fromProject(){
        return $this->belongsTo(Project::class, 'project_id'); // Lo mismo solo que con en Projects
    }
}
