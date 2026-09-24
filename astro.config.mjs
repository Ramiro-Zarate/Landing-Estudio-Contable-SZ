// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const isBuild = ['build', 'preview'].includes(process.env.npm_lifecycle_event);

// https://astro.build/config
export default defineConfig({
    site: 'https://estudiocontablesz.com',
    integrations: [react()],
    vite: {
        cacheDir: isBuild
            ? 'node_modules/.vite/build'
            : 'node_modules/.vite/dev',
    },
});
