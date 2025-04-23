<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
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
            'image' => 'nullable',
            'name' => 'required|string|max:255',
            'status' => 'required|string|in:pending,in_progress,completed',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date|after_or_equal:today',
            'project_link' => 'nullable|url',
        ];
    }
}
