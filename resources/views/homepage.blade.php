<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="{{ url('src/mainpage/logo.png') }}">
    <title>Sabatani</title>
</head>
<body>
    <div id="App"></div>
    @viteReactRefresh
    @vite('resources\js\app.js')
</body>
</html>