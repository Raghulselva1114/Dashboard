import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '', // use empty string for clean deploy on Vercel
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // alias for your source folder
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'], // optional optimization
  },
});
