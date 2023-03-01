import react from '@vitejs/plugin-react';
import { PeerServer } from 'peer';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  PeerServer({
    key: 'peerjs',
    port: 9000,
    path: '/',
  });
  console.log('http://26.73.48.182:9000');

  return {
    plugins: [react()],
    server: {
      host: '26.73.48.182',
      port: 3000,
    },
  };
});
