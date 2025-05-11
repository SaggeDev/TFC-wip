<?php

namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;


class TimeLogResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'user_id' => $this->user_id,
      'UserID' => new UserResource($this->user),//Si falla el ardino o algo, es por esto
      'entry_time' => $this->entry_time,
      'exit_time' => $this->exit_time,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}