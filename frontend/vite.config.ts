import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: { 'process.env': {} },
  build: {
    outDir: path.resolve(__dirname, '../static/js'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, './index.html'),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        // target: 'http://localhost:8000',
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
      },
    },
  },
});