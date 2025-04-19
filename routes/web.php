<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::redirect('/','/dashboard');//*1.Usuario llega, es redirigido a dashboard
Route::prefix('api')->group(function () {
    require base_path('routes/api.php');
});

Route::middleware(['auth','verified'])->group(function(){//Si el usuario ha iniciado sesión, puede acceder a las rutas
    //*2.Usuario pasa por el middleware para poder acceder, si es digno(Mjölnir a mi) pasa a la vista Dashboard administrada por inertia
    Route::get('/dashboard', fn ()=> Inertia::render('Dashboard'))
        ->name('dashboard')//Si recibe la ruta, devuelve el renderizado del componente de inertia
    ;
    //?Esto es básicamente barra libre, se prestan las rutas de los controladores como rutas uri
    Route::resource('project',ProjectController::class);
    Route::resource('task',TaskController::class);
    Route::resource('user',UserController::class);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
