import { defineConfig } from 'tsup'

// https://tsup.egoist.dev/
export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  splitting: false,
  clean: true,
  dts: true,
  format: ['cjs', 'esm', 'iife'],
})
