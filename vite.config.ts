import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // BẮT BUỘC để lắng nghe từ tất cả IP
    port: 5000,
    strictPort: true,
    cors: true,
    allowedHosts: ['.ngrok-free.app'], // Cho phép domain từ ngrok (quan trọng nhất)
  },
});
