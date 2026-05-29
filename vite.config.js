import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy Cal.com API calls to avoid CORS in dev
      '/cal-api': {
        target: 'https://api.cal.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/cal-api/, ''),
        headers: {
          'Origin': 'https://api.cal.com'
        }
      },
      // Proxy Resend API calls in dev (production uses Cloudflare Function)
      '/resend-api': {
        target: 'https://api.resend.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/resend-api/, ''),
        headers: {
          'Origin': 'https://api.resend.com'
        }
      }
    }
  }
});