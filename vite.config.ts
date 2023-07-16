import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.YOUR_STRING_VARIABLE': JSON.stringify(env.API_URL),
        },
    };
});
