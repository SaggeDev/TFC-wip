<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Resources\ProjectUserResource;
use App\Http\Resources\UserResource;
use App\Models\ProjectUser;



class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.'
     */

    public function index() //Si en web.php llamamos a este constructor sin especificar el método, se ejecuta automáticamente el index. Oportunidad perfecta para poner un router de react con inertia
    {//La razon por la que tarda tanto es porque se rehacen las querys con lo que quiere el usuario
        $query = Project::query();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");
        //^Para el orden de registros

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }
        if (request("id")) {
            $query->where("id", request("id"));
        }

        if (request('created_by')) {
            $query->whereHas('createdBy', function ($q): void {
                $q->where('name', 'like',  '%' . request('created_by') . '%');
            });
        }
        $usersOnProject = (clone $query)->with('projectUsers')->get()
            ->pluck('projectUsers')
            ->flatten()
            ->unique('id')
            ->values();

        $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);
        //^ Esta linea hace lo siguiente:
        // 1. Busca los resultados y crea un JSON
        // 2. Separa los resultados por cantidades de 10
        // 3. Añade al json datos como el siguiente y anterior índice y algunas cosas más para que podamos interactuar con esto o(Lo más interesante) mandar a crear un paginador prefabricado
        //! El problema con esto es que inertia envia los datos al arie libre, por lo que lleva a fallas de seguridad si no creamos un userResource que controler lo que se puede sacar y lo que no
        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'usersOnProject' => $usersOnProject

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($image instanceof \Illuminate\Http\UploadedFile) {
                $data['image'] = $image->store('project/' . Str::random(), 'public');
            }
        }
        Project::create($data);
        $newProject = Project::latest()->first();

        return to_route('project.show',$newProject->id)
            ->with('success', 'Proyecto creado exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();

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

        $usersOnProject = $project->users;

        // dd($usersOnProject);
        // ^ Esta herramienta al igual que el <pre> sirve para ver contenidos de la conexion y de los parámetros pasados

        return inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'UsersOnProject' => $usersOnProject,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $request->file('image');
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($project->image) {
                Storage::disk('public')->deleteDirectory(dirname($project->image));
            }
            $data['image'] = $image->store('project/' . Str::random(), 'public');
        } else {
            $data['image'] = $project->image;
        }
        $project->update($data);

        return to_route('project.show', $project->id)
            ->with('success', "El proyecto \"$project->name\" se ha editado con éxito");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $tasks[] = $project->tasks();
        foreach ($tasks as $task) {
            $task->delete();
        }
        $project->delete();
        if ($project->image) {
            Storage::disk('public')->deleteDirectory(dirname($project->image));
        }
        return to_route('project.index')
            ->with('success', "El proyecto " . $name . " ha sido borrado exitosamente junto con sus tareas");
    }
}
