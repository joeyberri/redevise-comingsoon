import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const localApiMockPlugin = () => ({
  name: 'local-api-mock',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if ((req.url === '/api/send-career' || req.url === '/api/send-email') && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            console.log(`\n📬 [Dev API Mock] Received POST to ${req.url}:`);
            console.log(JSON.stringify(JSON.parse(body), null, 2));
          } catch {
            console.log(`\n📬 [Dev API Mock] Received POST to ${req.url} (raw):`, body);
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, id: 'mock-id-' + Date.now() }));
        });
        return;
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApiMockPlugin()],
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
      }
    }
  }
});