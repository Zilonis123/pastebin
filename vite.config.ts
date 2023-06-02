import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { webSocketServer } from './webSocket.js';

export default defineConfig({
	server: {
        port: 3000
    },
    preview: {
        port: 3000
    },
	plugins: [sveltekit(), webSocketServer]
});
