import { defineConfig, loadEnv } from 'vite';

// docs: https://vitejs.dev/config

const config = defineConfig(({ mode }) => {
  const path = process.cwd();
  const env = loadEnv(mode, path);
  return {
    root: './src/demo',
    base: './',
    publicDir: path + '/public',
    server: {
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
      open: env.VITE_OPEN_BROWSER === 'true',
    },
    build: {
      outDir: path + '/docs',
      assetsDir: '',
    },
    preview: {
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
    },
  };
});

export default config;
