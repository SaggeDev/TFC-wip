<?php

use App\Http\Controllers\CardController;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\NFCController;

//^En este documento se crearán las rutas para el arduino 
Route::middleware([])->post('registerNFC', function (Request $request) {

  $validated = $request->validate([
    'hexKey' => 'required|string',
    'INOSecret' => 'required|string'
  ]);
  $hexKey = $validated['hexKey'];
  $INOSecret = $validated['INOSecret'];
  $user = User::where('role', 'arduino')->get()->first(fn($user) => Hash::check($INOSecret, $user->password));

  if ($user) {
    
    return app('App\Http\Controllers\CardController')->registerINO($hexKey);
  }

  return response()->json([
    'success' => false,
    'error' => 'Unauthorized'
  ], 401);
});

// Route::middleware([])->get('checkNFC/{hexKey}/{INOSecret}', function ($hexKey, $INOSecret) {
//   $user = User::where('role', 'arduino')->get()->filter(fn($user) => Hash::check($INOSecret, $user->password))->first();
//   //Uso first porque solo tengo un arduino, a futuro se cambiará para usar varios
//   if ($user) {
//     return app('App\Http\Controllers\CardController')->checkINO($hexKey);
//   }
//   return response()->json([
//     'success' => false,
//     'error' => 'Unauthorized'
//   ], 401);
// });

Route::middleware([])->post('checkNFC', function (Request $request) {

  $validated = $request->validate([
    'hexKey' => 'required|string',
    'INOSecret' => 'required|string'
  ]);
  $hexKey = $validated['hexKey'];
  $INOSecret = $validated['INOSecret'];
  $user = User::where('role', 'arduino')->get()->first(fn($user) => Hash::check($INOSecret, $user->password));
  if ($user) {
    return app('App\Http\Controllers\CardController')->checkINO($hexKey);
  }
  return response()->json([
    'success' => false,
    'error' => 'Unauthorized'
  ], 401);
});




// // Función para poder establecer el idioma
// Route::get('/translations/{lang}', function ($lang) {
//     App::setLocale($lang);
//     return response()->json([
//         'messages' => trans('messages'),
//     ]);
// });
