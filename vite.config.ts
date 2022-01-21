import type { UserConfig, ConfigEnv } from 'vite';
import { defineConfig, loadEnv } from 'vite';

// docs: https://vitejs.dev/config

const config = defineConfig(async ({ mode }: ConfigEnv): Promise<UserConfig> => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
      open: env.VITE_OPEN_BROWSER === 'true',
      proxy: {
        // https://vitejs.dev/config/#server-proxy
        // '/api': {},
      },
    },
    plugins: [
      //
    ],
  };
});

export default config;
