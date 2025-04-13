import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './', // 👈 This line is crucial for correct file paths in deployment
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
