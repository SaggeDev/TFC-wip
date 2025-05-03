<?php

use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
//^En este documento se crearán las rutas para el arduino 
use Illuminate\Support\Facades\Hash;

Route::get('checkNFC/{hexKey}/{INOSecret}', function($hexKey, $INOSecret) {
    $users = User::all();

    foreach ($users as $user) {
        if (Hash::check($INOSecret, $user->password)) {
            return app('App\Http\Controllers\CardController')->check($hexKey);
        }
    }

    return response()->json([
        'error' => 'Unauthorized',
        'key' => $hexKey,
        'inoSecret' => $INOSecret
    ], 401);
});


// // Función para poder establecer el idioma
// Route::get('/translations/{lang}', function ($lang) {
//     App::setLocale($lang);
//     return response()->json([
//         'messages' => trans('messages'),
//     ]);
// });
