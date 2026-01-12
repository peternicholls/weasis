import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'cornerstone': ['@cornerstonejs/core', '@cornerstonejs/tools'],
          'dicom': ['dicom-parser', 'dcmjs', '@cornerstonejs/dicom-image-loader'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    exclude: ['@cornerstonejs/core', '@cornerstonejs/tools'],
  },
});
