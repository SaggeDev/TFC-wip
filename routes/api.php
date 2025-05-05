<?php

use App\Http\Controllers\CardController;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
//^En este documento se crearán las rutas para el arduino 
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\NFCController;


Log::debug("Entró a Api");
Route::middleware([])->post('registerNFC', function (Request $request) {
  Log::debug("Entró a Reg");

  $validated = $request->validate([
    'hexKey' => 'required|string',
    'INOSecret' => 'required|string'
  ]);
  Log::debug('Validated data:', $validated);
  return ['success' => true, 'validated' => $validated];
});
Route::middleware([])->get('checkNFC/{hexKey}/{INOSecret}', function ($hexKey, $INOSecret) {
  $user = User::where('role', 'arduino')->get()->filter(fn($user) => Hash::check($INOSecret, $user->password))->first();
  //Uso firsto porque solo tengo un arduino, a futuro se cambiará para usar varios
  if ($user) {
    return app('App\Http\Controllers\CardController')->checkINO($hexKey);
  }


  return response()->json([
    'success' => false,
    'error' => 'Unauthorized'
  ], 401);
});

Route::post('/registerNFC', [CardController::class, 'registerINO']);

// Route::middleware([])->post('registerNFC', function (Request $request) {
//   Log::debug("Entró a Reg");

//   $validated = $request->validate([
//     'hexKey' => 'required|string',
//     'INOSecret' => 'required|string'
//   ]);
//   Log::debug('Validated data:', $validated);
//   return ['success' => true, 'validated' => $validated];
// });
// Route::post('ene',function() {
//   return ['success' => true];
// });

//?Prototipo de solicitud post del checkNFC, con verificación de parámetros y muy seguro para siguientes versiones
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

Log::debug("salió de Api");



// // Función para poder establecer el idioma
// Route::get('/translations/{lang}', function ($lang) {
//     App::setLocale($lang);
//     return response()->json([
//         'messages' => trans('messages'),
//     ]);
// });
