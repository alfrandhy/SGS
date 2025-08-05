import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        cors: {
            origin: ['http://10.100.0.254'],
        },
        host: '10.100.0.254',
        port: 5173,
        hmr: {
            host: '10.100.0.254',
        },
    },
    plugins: [
        react(),
        tailwindcss(),
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.jsx',
            ],
            refresh: true,
        }),
    ],
});
