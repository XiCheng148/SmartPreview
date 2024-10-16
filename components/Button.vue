<script lang="ts" setup>
import { ref } from 'vue';

const tip = ref('');

const buttonConfig = {
  copy: {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M715.648 625.152 670.4 579.904l90.496-90.56c75.008-74.944 85.12-186.368 22.656-248.896-62.528-62.464-173.952-52.352-248.96 22.656L444.16 353.6l-45.248-45.248 90.496-90.496c100.032-99.968 251.968-110.08 339.456-22.656 87.488 87.488 77.312 239.424-22.656 339.456l-90.496 90.496zm-90.496 90.496-90.496 90.496C434.624 906.112 282.688 916.224 195.2 828.8c-87.488-87.488-77.312-239.424 22.656-339.456l90.496-90.496 45.248 45.248-90.496 90.56c-75.008 74.944-85.12 186.368-22.656 248.896 62.528 62.464 173.952 52.352 248.96-22.656l90.496-90.496zm0-362.048 45.248 45.248L398.848 670.4 353.6 625.152z"></path></svg>',
    text: 'copy',
    desc: '复制链接',
    show: false,
    click: () => {
      navigator.clipboard.writeText(
        removeSmartPopupParam(window.location.href)
      );
      const desc = buttonConfig.copy.desc;
      tip.value = '复制成功！';
      setTimeout(() => {
        buttonConfig.copy.desc = desc;
        tip.value = '';
      }, 1000);
    },
  },
  open: {
    icon: '<svg viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M12 13a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v3.5a.5.5 0 0 0 1 0V3h9v9H8.5a.5.5 0 0 0 0 1zM9 6.5v3a.5.5 0 0 1-1 0V7.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 7H5.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.497" clip-rule="evenodd"></path></svg>',
    text: 'open',
    desc: '新标签中打开',
    show: false,
    click: () => {
      window.open(removeSmartPopupParam(window.location.href));
      window.close();
    },
  },
  // openInCurrentTab: {
  //   icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64z"></path></svg>',
  //   text: 'openInCurrentTab',
  //   desc: '当前标签中打开',
  //   show: false,
  //   click: () => {
  //     window.open(window.location.href, '_self');
  //     window.close();
  //   },
  // },
};

const activeDesc = ref('');

const mouseover = (type: string) => {
  activeDesc.value = buttonConfig[type].desc;
};

const mouseleave = () => {
  activeDesc.value = '';
};
</script>

<template>
  <div class="container">
    <!-- btn -->
    <div
      v-for="item in buttonConfig"
      class="btn shadow-lg"
      alt="item.text"
      @click="item.click"
      @mouseenter="mouseover(item.text)"
      @mouseleave="mouseleave"
    >
      <div class="icon" v-html="item.icon"></div>
    </div>
    <!-- text -->
    <div v-show="activeDesc && !tip" class="desc">{{ activeDesc }}</div>
    <div v-show="tip" class="desc">{{ tip }}</div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  right: 0.5rem;
  top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  pointer-events: all;
}

.btn {
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  backdrop-filter: blur(24px);
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bt12n:hover {
  transform: scale(1.2);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.4, 1);
  transition-duration: 300ms;
}

.icon {
  width: 1rem;
  height: 1rem;
  color: white;
}

.desc {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  color: white;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  white-space: nowrap;
  backdrop-filter: blur(24px);
  background: rgba(0, 0, 0, 0.6);
}
</style>
