import { ref, watch, onMounted } from 'vue';
import { storage } from 'wxt/storage';

export enum Mode {
  Smart,
  Center,
}

export const ModeTextMap = [
  {
    value: Mode.Center,
    label: '居中模式',
    desc: '居中模式会将弹窗居中在浏览器中央',
  },
  {
    value: Mode.Smart,
    label: '智能模式',
    desc: '智能模式会记忆你上次弹窗的位置',
  },
];

interface Setting {
  mode: Mode;
  width: number;
  height: number;
  lang: string;
  smartModeConfig: Record<string, blackItem>;
}

export interface blackItem {
  url: string;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

export const defaultSetting: Setting = {
  mode: Mode.Center,
  width: 90,
  height: 92,
  lang: 'zh',
  smartModeConfig: {},
};

// 使用单例模式
let settingState: Setting | null = null;

export function useSetting() {
  const setting = ref<Setting>();

  const loadSetting = async () => {
    const storedSetting = await storage.getItem(StorageId);
    setting.value = storedSetting
      ? JSON.parse(storedSetting as string)
      : defaultSetting;
  };

  const saveSetting = async () => {
    await storage.setItem(StorageId, JSON.stringify(setting.value));
  };

  watch(setting, saveSetting, { deep: true });

  loadSetting();

  const resetSetting = () => {
    settingState = { ...defaultSetting };
    setting.value = settingState;
  };

  // onMounted(async () => {
  //   storage.watch(StorageId, async newValue => {
  //     console.log('storage.watch', JSON.parse(newValue as string));
  //   });
  // });

  return {
    Mode,
    ModeTextMap,
    setting,
    resetSetting,
  };
}
