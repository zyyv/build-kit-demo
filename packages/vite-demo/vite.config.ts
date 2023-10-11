import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: './src/index.ts',
      fileName: 'index',
      formats: ['es', 'cjs', 'iife'],
      name: 'viteDemo',
    },
  },
  plugins: [dts({ rollupTypes: true })],
})
