<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>PT. Sabatani Global Solusindo - Engineering, Procurement & Construction</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600,700&display=swap" rel="stylesheet" />

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="public/src/mainpage/logo.png">

        <!-- Styles -->
        @vite('resources/css/app.css')
    </head>
    <body class="font-sans antialiased">
        <div id="app" data-page="{{ json_encode($page) }}"></div>

        @vite('resources/js/app.jsx')
    </body>
</html>
