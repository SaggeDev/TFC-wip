<?php

namespace App\Http\Controllers;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;


use Illuminate\Http\Request;

class ProjectUserController extends Controller
{
    public function store(Request $request, Project $project)
{
    $user = Auth::user();

    if ($project->users()->where('user_id', $user->id)->exists()) {
        return redirect()->back()->with('success', 'Ya estás en el proyecto.');
    }

    $project->users()->attach($user->id);

    return redirect()->back()->with('success', 'Te uniste al proyecto exitosamente.');
}
}
