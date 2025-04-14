<?php
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

//? Función para poder establecer el idioma
Route::get('/translations/{lang}', function ($lang) {
    App::setLocale($lang);
    return response()->json([
        'messages' => trans('messages'),
    ]);
});
