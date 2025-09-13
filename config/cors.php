<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // Paths that should be accessible via CORS (API routes, for example)
    'paths' => ['api/*', 'sanctum/csrf-cookie', '*'],

    // HTTP methods allowed for CORS requests (use ['*'] to allow all methods)
    'allowed_methods' => ['*'],

    // Origins allowed to access the resources (use ['*'] for all origins;
    // for security, prefer specifying your frontend URL(s) explicitly)
    'allowed_origins' => ['*'],

    // Patterns for allowed origins, using regex (alternative to allowed_origins)
    'allowed_origins_patterns' => [],

    // Headers allowed to be sent in the request
    'allowed_headers' => ['*'],

    // Headers exposed to the browser
    'exposed_headers' => [],

    // How long the results of a preflight request can be cached (seconds)
    'max_age' => 0,

    // Whether credentials (cookies, authorization headers) are supported
    'supports_credentials' => false,

];
