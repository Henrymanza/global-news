import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Backend URL:
  //   - Local dev:    empty string → Vite proxies /api to localhost:3001
  //   - Production:   VITE_API_URL → full URL of Render API service
  const apiTarget = env.VITE_API_URL || 'http://localhost:3001'
  const isProd    = mode === 'production'

  return {
    plugins: [react()],
    root:      '.',
    publicDir: 'public',

    server: {
      port: 5173,
      proxy: {
        '/api': {
          target:       apiTarget,
          changeOrigin: true,
          secure:       false,
          configure: (proxy) => {
            proxy.on('error', () => {
              // Silently handle — backend may not be running locally
            })
          }
        }
      }
    },

    build: {
      outDir:    'dist',
      // Sourcemaps in dev preview, not in production (saves bundle size)
      sourcemap: !isProd,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react':   ['react', 'react-dom'],
            'vendor-map':     ['leaflet', 'react-leaflet'],
            'vendor-charts':  ['recharts'],
            'vendor-state':   ['zustand'],
            'vendor-firebase':['firebase'],
          }
        }
      }
    },

    preview: { port: 4173 }
  }
})
