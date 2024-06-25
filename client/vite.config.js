import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from '@rollup/plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: '3000',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8000/',
    //     changeOrigin: true,
    //     secure: false,
    //     ws: true,

    //    rewrite: (path) => path.replace('/api', ''),
    //   },
    // },
  },
  plugins: [
    react(),
    {
      ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)' }),
      enforce: 'pre',
      apply: 'build',
    },
  ],
});
