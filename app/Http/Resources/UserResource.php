<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    //*El propósito final de esta clase es buscar en la base de datos los atributos que se pidan y devolver lo que se ordene
    //! Devolverá error si no hay una relación definida en el modelo de la tabla que solicita
    
    //~ Ejemplo:
    //~ - Entrada: 1
    //~ - Salida: {"id":1,"name":"Alex","email":"alexollemail@gmail.com"}
    {
        return [
            "id"=>$this->id,
            "name"=>$this->name,
            "email"=>$this->email,
            "role"=>$this->role
        ];
    }
}
