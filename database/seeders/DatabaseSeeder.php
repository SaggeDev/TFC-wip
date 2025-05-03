<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Carlos',
            'email' => 'test@example.com',
            'password'=>bcrypt('123.123A'),
            'email_verified_at'=>time(),
            'role'=>'admin'
        ]);
        User::factory()->create([
            'name' => 'Alex',
            'email' => 'alexollemail@gmail.com',
            'password'=>bcrypt('123.123.123'),
            'email_verified_at'=>time(),
            'role'=>'user'
        ]);

        Project::factory()->count(30)->hasTasks(30)->create();//?Crea 30 proyectos con 30 tareas cada uno
    }
}
