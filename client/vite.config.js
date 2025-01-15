import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from '@rollup/plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: '3000',
  },
  plugins: [
    react(),
    {
      ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)' }),
      enforce: 'pre',
      apply: 'build',
    },

  ],
  resolve: {
    alias: {
      '@': '/src', // Add this alias
    },
  },
});
