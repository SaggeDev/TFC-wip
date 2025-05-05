<?php

namespace Database\Seeders;

use App\Models\Card;
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
        User::factory()->create([
            'name' => 'Arduino UNO R4 WIFI 123',
            'email' => 'ELADMINISTRADOR@gmail.com',
            'password'=>bcrypt('ArduinoKey'),
            'email_verified_at'=>time(),
            'role'=>'arduino'
        ]);
        Card::factory()->create([
            'user_owner_id' => 2,
            'key' => '44:5C:1:4'
        ]);
        Card::factory()->create([
            'user_owner_id' => 1,
            'key' => '3A:70:F9:3'
        ]);

        Project::factory()->count(30)->hasTasks(30)->create();//?Crea 30 proyectos con 30 tareas cada uno
    }
}
