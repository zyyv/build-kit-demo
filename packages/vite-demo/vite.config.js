import { defineConfig } from "vite";
export default defineConfig({
    build: {
        minify: false,
        lib: {
            entry: 'src/index.ts',
            fileName: 'index',
            formats: ['es', 'cjs', 'iife'],
            name: 'viteDemo',
        }
    }
});
