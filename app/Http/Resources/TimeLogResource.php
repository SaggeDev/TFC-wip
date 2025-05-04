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
      'UserID' => new UserResource($this->user_id),
      'start_time' => $this->start_time,
      'end_time' => $this->end_time,
      'duration' => $this->duration,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}