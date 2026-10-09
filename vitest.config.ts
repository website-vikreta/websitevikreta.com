import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.tsx'],
    include: ['{app,components,lib,hooks}/**/*.test.{ts,tsx}'],
    clearMocks: true,
    coverage: {
      provider: 'v8',
      include: ['components/**/*.{ts,tsx}', 'lib/**/*.ts'],
      exclude: ['**/*.test.{ts,tsx}'],
      reporter: ['text-summary', 'html'],
    },
  },
});
