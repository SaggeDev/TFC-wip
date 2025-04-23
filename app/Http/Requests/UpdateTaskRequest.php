<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
{
    return [
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'required|in:pending,in_progress,completed',
        'due_date' => 'nullable|date',
        'project_id' => 'required|exists:projects,id',
        'priority' => 'nullable|in:low,medium,high',
        'assigned_user_id' => 'nullable|exists:users,id',
        'image' => 'nullable',
        '_method' => 'in:PUT', 
    ];
}
}
