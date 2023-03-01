import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const config = defineConfig(({ mode }) => {
  const rootDir = path.dirname(fileURLToPath(import.meta.url));
  const __dirname = mode === 'prod' ? path.join(rootDir, '/dist') : rootDir;

  return {
    server: { host: '26.73.48.182', port: 3000 },
    plugins: [react()],
    root: __dirname,
  };
});

export default config;
