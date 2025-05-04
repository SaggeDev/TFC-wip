<?php

use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
//^En este documento se crearán las rutas para el arduino 
use Illuminate\Support\Facades\Hash;

Route::middleware([])->get('checkNFC/{hexKey}/{INOSecret}', function ($hexKey, $INOSecret) {
  $user = User::where('role', 'arduino')->get()->filter(fn($user) => Hash::check($INOSecret, $user->password))->first();
  if ($user) {
      return app('App\Http\Controllers\CardController')->checkINO($hexKey);
  }
  

  // Only return failure after checking all users
  return response()->json([
    'success' => false,
    'error' => 'Unauthorized'
  ], 401);
});

Route::get('/', function () {
  return ["Yepaa" => 'chaval que fas'];
});

// // Función para poder establecer el idioma
// Route::get('/translations/{lang}', function ($lang) {
//     App::setLocale($lang);
//     return response()->json([
//         'messages' => trans('messages'),
//     ]);
// });
