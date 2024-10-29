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
    permissions: ['storage', 'tabs'],
    default_locale: 'zh',
    ...(browser === 'firefox'
      ? {
        browser_specific_settings: {
          gecko: {
            id: '1284670996@qq.com',
          },
        },
      }
      : {}),
  }),
  vite: () => ({
    plugins: [vue()],
  }),
});
