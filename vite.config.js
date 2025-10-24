import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        cors: true,
    },
    // plugins: [
    //     laravel({
    //         input: 'resources/js/app.jsx',
    //         refresh: true,
    //     }),
    //     react(),
    // ],
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build', // This is the default, but ensure it's not overridden
    },

});
