<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Inertia\Inertia;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TaskController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $query = Task::query();


        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");
        //^Para el orden de registros

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
        
        if (request('fromProject')) {
            $query->whereHas('fromProject', function ($q): void {
                $q->where('name','like',  '%' . request('fromProject') . '%');
            });
        }
        // if (request('assigned_user_id')) {
        //     $query->whereHas('assigned_user_id', function ($q): void {
        //         $q->where('name','like',  '%' . request('assigned_user_id') . '%');
        //     });
        // }
        

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        //^ Esta linea hace lo siguiente:
        // 1. Busca los resultados y crea un JSON
        // 2. Separa los resultados por cantidades de 10
        // 3. Añade al json datos como el siguiente y anterior índice y algunas cosas más para que podamos interactuar con esto o(Lo más interesante) mandar a crear un paginador prefabricado
        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::query()->orderBy('id', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Task/Create", [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        
        $data = $request->validated();
        // dd($request);
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image instanceof \Illuminate\Http\UploadedFile) {
            $data['image'] = $image->store('task/' . Str::random(), 'public');
        }
        Task::create($data);
        $newTask = Task::latest()->first();

        return to_route('task.show',$newTask->id)
            ->with('success', 'La tarea ha sido creada correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return inertia('Task/Show', [
            'task' => new TaskResource($task),
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::query()->orderBy('id', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return inertia("Task/Edit", [
            'task' => new TaskResource($task),
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $name=$task->name;
        $data = $request->validated();
        $image = $request->file('image') ;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($task->image) {
                Storage::disk('public')->deleteDirectory(dirname($task->image));
            }
            $data['image'] = $image->store('task/' . Str::random(), 'public');
        }else{
            $data['image'] = $task->image;
        }
        $task->update($data);

        return to_route('task.show',$task->id)
            ->with('success', "La tarea \"$name\" ha sido modificada con éxito");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        if ($task->image) {
            Storage::disk('public')->deleteDirectory(dirname($task->image));
        }
        return to_route('task.index')
            ->with('success', "La tarea \"$name\" ha sido eliminada con éxito");
    }
    public function myTasks()
    {
        $user = Auth::user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}