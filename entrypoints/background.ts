import { browser } from 'wxt/browser';
import { defineBackground } from 'wxt/sandbox';
import { useSetting, Mode } from '@/utils/useSetting';

export default defineBackground(() => {
  const { setting } = useSetting();

  browser.runtime.onMessage.addListener(async message => {
    if (message.action === 'openPopup') {
      await openPopup(message);
    } else if (message.action === 'closePopup') {
      await closePopup(message);
    }
  });

  async function openPopup(message: any) {
    const url = new URL(message.url);
    url.searchParams.set('isSmartPopup', 'true');

    let windowOptions;

    if (!setting.value) return;
    if (setting.value.mode === Mode.Center) {
      windowOptions = await getCenterModeOptions();
    } else {
      windowOptions = await getSmartModeOptions(message.url);
    }

    browser.windows.create({
      ...windowOptions,
      url: url.toString(),
      type: message.type || 'popup',
    });
  }

  async function getCenterModeOptions() {
    const currentWindow = await browser.windows.getCurrent();
    const { top = 0, left = 0, width = 0, height = 0 } = currentWindow;

    const widthPercentage = setting.value ? setting.value.width : 90;
    const heightPercentage = setting.value ? setting.value.height : 92;
    const newWidth = Math.round((width * widthPercentage) / 100);
    const newHeight = Math.round((height * heightPercentage) / 100);
    const newLeft = Math.round(left + (width - newWidth) / 2);
    const newTop = Math.round(top + (height - newHeight) / 2);

    return { width: newWidth, height: newHeight, left: newLeft, top: newTop };
  }

  async function getSmartModeOptions(url: string) {
    if (!setting.value) return;
    const newUrl = new URL(url);
    const config = setting.value.smartModeConfig[newUrl.host] || false;
    if (config) {
      return {
        width: config.width,
        height: config.height,
        left: config.left,
        top: config.top,
      };
    }
    return await getCenterModeOptions();
  }

  async function closePopup(message: any) {
    if (!setting.value) return;
    const { top, left, width, height } = message.postion;
    const url = new URL(message.url);
    setting.value.smartModeConfig[url.host] = {
      url: message.url,
      left,
      top,
      width,
      height,
    };
  }
});
