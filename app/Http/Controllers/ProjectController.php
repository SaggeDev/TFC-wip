<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){//Si en web.php llamamos a este constructor sin especificar el método, se ejecuta automáticamente el index. Oportunidad perfecta para poner un router de react con inertia
        
        $projects=Project::query()//Hago una query en proyectos
            ->paginate(10)//Que me devuelva colecciones de 10 resultados 
            ->onEachSide(1);//Por página
        //^ Esta linea hace lo siguiente:
        // 1. Busca los resultados y crea un JSON
        // 2. Separa los resultados por cantidades de 10
        // 3. Añade al json datos como el siguiente y anterior índice y algunas cosas más para que podamos interactuar con esto o(Lo más interesante) mandar a crear un paginador prefabricado
        //! El problema con esto es que inertia envia los datos al arie libre, por lo que lleva a fallas de seguridad si no creamos un userResource que controler lo que se puede sacar y lo que no
        return Inertia::render('Project/Index', [
            "projects"=>ProjectResource::collection($projects),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
