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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->timestamp('due_date')->nullable();
            //?El objetivo principal era hacerlo como enum. Pero pensandolo mejor, es mucho más flexible con un string y usar directamente un selector en la página
            $table->string('status');
            // $table->enum(true,['On progress','Completed','Stored']);
            $table->string('image')->nullable();
            $table->string('project_link')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');//Al crear el proyecto, saldra updated by el creador directamente
            $table->timestamps();//Para sacar la fecha de creación será del propio created_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
