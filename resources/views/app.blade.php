<!DOCTYPE html>
<!-- //? Va a estar en modo oscuro -->
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        {{--Inertia está añadiendo al título de la página el nombre de la app --}}

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        {{-- Inertia, @routes es lo que permite usar las rutas definidas en web.php y auth.php, autenticarlas y usarlas en otras páginas --}}
        @viteReactRefresh
        {{-- Inertia, @inertiaREactRefresh es lo que permite que react haga su magia al cambiar algo --}}
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        {{-- Inertia, @vite... carga, en este caso, las demás páginas de antemano para usar react y cambiar de página con react --}}
        @inertiaHead
        {{-- Es la parte encargada de cargar/generar el meta texto de la página --}}
    </head>
    <body class="font-sans antialiased">
        @inertia
        {{-- Aqui es donde se generará el contenido del documento referenciado --}}
    </body>
</html>
