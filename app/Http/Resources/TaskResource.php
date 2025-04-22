<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
            return [
                'id'=>$this->id,
                'name'=>$this->name,
                'description'=>$this->description,
                'created_at'=>(new Carbon($this->created_at))->format('Y-m-d'),//Carbon es una libreria que se encarga de cuestiones de tiempo/fechas
                'due_date'=>(new Carbon($this->due_date))->format('Y-m-d'),
                'status'=>$this->status,
                'priority'=>$this->priority,
                'image'=>$this->image,
                'task_link'=>$this->task_link,
                'createdBy'=>new UserResource($this->createdBy),//? Esta linea devuelve(en vez de la clave en si) el nombre de usuario, pasando por la tabla usuario.
                'updatedBy'=>new UserResource($this->updatedBy),//? Tecnicamente está configurado para que devuelva más parámetros
                'fromProject'=>new ProjectResource($this->fromProject),//? Tecnicamente está configurado para que devuelva más parámetros
                'createdFor'=>new UserResource($this->createdFor)
                //^Estoy llamando a los metodos dentro de userResource, no a los campos. Aviso a futuro, esto es también en el modelo al llamar al método 

            ];
    }
    
}
