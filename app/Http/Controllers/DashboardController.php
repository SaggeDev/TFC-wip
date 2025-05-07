<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
  public function index()
  {
    $sortField = request("sort_field", 'id');
    $sortDirection = request("sort_direction", "asc");
    //^Para el orden de registros
    $query = Task::query();

    if (request("name")) {
      $query->where("name", "like", "%" . request("name") . "%");
    }
    if (request("id")) {
      $query->where("id", request("id"));
    }
    if (request("priority")) {
      $query->where("priority", request("priority"));
    }
    if (request("status")) {
      $query->where("status", request("status"));
    }

    $queryParams = request()->query() ?: null;

    $user = Auth::user();

    $myPendingTasks = Task::query()
      ->where('status', 'pending')
      ->where('assigned_user_id', $user->id)
      ->count();


    $myProgressTasks = Task::query()
      ->where('status', 'in_progress')
      ->where('assigned_user_id', $user->id)
      ->count();


    $myCompletedTasks = Task::query()
      ->where('status', 'completed')
      ->where('assigned_user_id', $user->id)
      ->count();

    $activeTasks = $query
      ->whereIn('status', ['pending', 'in_progress'])
      ->where('assigned_user_id', $user->id)
      ->orderBy($sortField, $sortDirection)
      ->paginate(10)
      ->onEachSide(1);
    $activeTasks = TaskResource::collection($activeTasks);
    return inertia(
      'Dashboard',
      compact(
        'myPendingTasks',
        'myProgressTasks',
        'myCompletedTasks',
        'queryParams',
        'activeTasks', //
      )
    );
  }
}
