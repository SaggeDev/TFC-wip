<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            $table->string('status');
            $table->string('priority');
            $table->string('task_link')->nullable();
            $table->timestamp('due_date')->nullable();
            $table->foreignId('assigned_user_id')->nullable()->constrained('users');//A quien se la han mandado, relación 1-1  
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');//Al crear el proyecto, saldra updated by el creador directamente
            $table->foreignId('project_id')->constrained('projects');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
