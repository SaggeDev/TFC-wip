<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>fake()->sentence(),
            'description'=>fake()->realText(),
            'due_date'=>fake()->dateTimeBetween('now','+2 year'),
            'status'=>fake()->randomElement(['pending','in_progress','completed']),//Solo puede ser uno de estos 3
            'priority'=>fake()->randomElement(['low','high','urgent']),//Solo puede ser uno de estos 3
            'image'=>fake()->imageUrl(),
            'task_link'=>fake()->url(),
            'assigned_user_id'=>1,
            'created_by'=>1,
            'updated_by'=>1
        ];
    }
}
