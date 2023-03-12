import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './src/manifest.config.mjs'
import eslint from 'vite-plugin-eslint';
import viteSentry from 'vite-plugin-sentry';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')};

  const sentryRelease = `yaes@${process.env.npm_package_version}`;
  const isReleasing = !!process.env.VERSION;

  return defineConfig({
    build: {
      minify: false,
      sourcemap: true,
    },
    plugins: [
      viteSentry({
        debug: true,
        dryRun: !isReleasing,
        url: 'https://magl.sentry.io',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "magl",
        project: "yaes",
        release: sentryRelease,
        include: "./dist",
        ignore: ["node_modules", "vue.config.js"],
        deploy: {
          env: mode,
        },
        setCommits: {
          auto: true
        },
        sourceMaps: {
          include: ['./dist/assets'],
          ignore: ['node_modules'],
          urlPrefix: '~/assets'
        }
      }),
      vue(),
      crx({manifest}),
      eslint(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    },
  });
}