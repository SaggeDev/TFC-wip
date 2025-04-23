<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use App\Models\User;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'image',
        'status',
        'priority',
        'task_link',
        'due_date',
        'assigned_user_id',
        'project_id',
        'updated_by'
    ];

    public function fromProject()
    {
        return $this->belongsTo(Project::class, 'project_id'); // Lo mismo solo que con en Projects
    }
    public function createdFor()
    {
        return $this->belongsTo(User::class, 'assigned_user_id'); // Lo mismo solo que con en Projects
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
