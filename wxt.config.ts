import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  manifest: {
    permissions: ['storage', 'tabs'],
    default_locale: 'zh',
  },
  vite: () => ({
    plugins: [
      vue(),
    ],
  }),
});
