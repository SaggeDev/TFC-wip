<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Card>
 */
class CardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_owner_id' => User::factory(), // creates or associates a User
            'key' => strtoupper(fake()->bothify('##:??:##:??')), // e.g., "12:AB:45:CD"
        ];
    }
}
