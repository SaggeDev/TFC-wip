<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProjectUser;

class ProjectUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProjectUser::factory()->count(10)->create();
    }
}
