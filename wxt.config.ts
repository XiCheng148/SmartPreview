import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  manifest: ({ browser }) => ({
    permissions: ['activeTab', 'storage', 'tabs'],
    action: {},
    page_action: {},
    default_locale: 'zh',
    ...(browser === 'firefox'
      ? {
        browser_specific_settings: {
          gecko: {
            id: 'xichenglzp1231231231231@firefox.com',
          },
        },
      }
      : {
      }),
  }),
  vite: () => ({
    plugins: [vue()],
  }),
});
