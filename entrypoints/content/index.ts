import Button from '@/components/Button.vue';
import { createApp } from 'vue';
import { ContentScriptContext } from 'wxt/client';
import { removeSmartPopupParam } from '@/utils/url';
import './reset.css';

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    window.addEventListener('click', contentClickHandle, { capture: true });

    // 插件打开的popup才注册~~~
    // 检查 URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const isSmartPopup = urlParams.get('isSmartPopup') === 'true';
    if (isSmartPopup) {
      console.log(`🚀 ~ main ~ curWindow:`, window);
      // hover的时候展示按钮defineButton
      const ui = await defineButton(ctx);
      ui.mount();
      ctx.addEventListener(window, 'wxt:locationchange', event => {
        ui.mount();
      });

      const body = document.querySelector('body');

      // 按键关闭
      window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          window.close();
        }
      });

      // 失焦关闭
      window.addEventListener('blur', async event => {
        const storedSetting: any = await storage.getItem(StorageId);
        if (!JSON.parse(storedSetting).closeOnBlur) return;
        await browser.runtime.sendMessage({
          action: 'closePopup',
          url: removeSmartPopupParam(window.location.href, true),
          postion: {
            left: window.screenX,
            top: window.screenY,
            width: window.outerWidth,
            height: window.outerHeight,
          },
        });
        window.close();
      });

      // 更新位置大小
      window.addEventListener('beforeunload', async event => {
        await browser.runtime.sendMessage({
          action: 'closePopup',
          url: removeSmartPopupParam(window.location.href, true),
          postion: {
            left: window.screenX,
            top: window.screenY,
            width: window.outerWidth,
            height: window.outerHeight,
          },
        });
      });
    }
  },
});

function defineButton(ctx: ContentScriptContext) {
  return createShadowRootUi(ctx, {
    name: 'smart-preview-btns',
    position: 'modal',
    zIndex: 99999,
    onMount(container, _shadow, shadowHost) {
      const app = createApp(Button);
      app.mount(container);
      shadowHost.style.pointerEvents = 'none';
      return app;
    },
    onRemove(app) {
      app?.unmount();
    },
  });
}

async function contentClickHandle(event: any) {
  if (!event.shiftKey) return;
  event.preventDefault();
  event.stopPropagation();
  const url = getLinkUrl(event);
  console.log(`🚀 ~ contentClickHandle ~ url:`, url);
  if (url) {
    await browser.runtime.sendMessage({
      action: 'openPopup',
      url,
    });
  }
}

const isValidUrl = (href: string): boolean => {
  if (!href) return false;
  try {
    const url = new URL(href);
    return (
      (url.origin !== location.origin || url.pathname !== location.pathname) &&
      url.protocol === location.protocol
    );
  } catch (err) {
    console.error(err);
    return false;
  }
};

function getLinkUrl(event: Event): string | null {
  const anchor = event
    .composedPath()
    .find(
      (node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement
    );

  if (
    anchor &&
    isValidUrl(anchor.href) &&
    !/^(mailto|tel|javascript):/.test(anchor.href)
  ) {
    return anchor.href;
  }

  // 检查直接点击的元素
  const target = event.target as HTMLElement;

  // 检查是否是图片元素
  if (target instanceof HTMLImageElement && target.src) {
    return target.src;
  }

  // 检查自定义属性
  const customUrl = target.getAttribute('data-url');
  if (customUrl) return customUrl;

  // 检查 aria 属性
  if (target.getAttribute('role') === 'link') {
    return target.getAttribute('href') || null;
  }
  return null;
}
