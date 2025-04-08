<?php

namespace Database\Factories;

use Carbon\Doctrine\DateTimeImmutableType;
use DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array//Generará datos falsos cada vez que lo llamen
    {
        return [
            'name'=>fake()->sentence(),
            'description'=>fake()->realText(),
            'due_date'=>fake()->dateTimeBetween('now','+2 year'),
            'status'=>fake()->randomElement(['pending','in_progress','completed']),//Solo puede ser uno de estos 3
            'image'=>fake()->imageUrl(),
            'project_link'=>fake()->url(),
            //? Estos están hardcodeados por no tocar datos generados automaticamente
            'created_by'=>1,
            'updated_by'=>1


        ];
    }
}
