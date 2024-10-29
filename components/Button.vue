<script lang="ts" setup>
import { ref } from "vue";

const buttonConfig = ref({
  copy: {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" ><path fill="currentColor" d="M715.648 625.152 670.4 579.904l90.496-90.56c75.008-74.944 85.12-186.368 22.656-248.896-62.528-62.464-173.952-52.352-248.96 22.656L444.16 353.6l-45.248-45.248 90.496-90.496c100.032-99.968 251.968-110.08 339.456-22.656 87.488 87.488 77.312 239.424-22.656 339.456l-90.496 90.496zm-90.496 90.496-90.496 90.496C434.624 906.112 282.688 916.224 195.2 828.8c-87.488-87.488-77.312-239.424 22.656-339.456l90.496-90.496 45.248 45.248-90.496 90.56c-75.008 74.944-85.12 186.368-22.656 248.896 62.528 62.464 173.952 52.352 248.96-22.656l90.496-90.496zm0-362.048 45.248 45.248L398.848 670.4 353.6 625.152z"></path></svg>',
    text: "copy",
    desc: "复制链接",
    show: false,
    click: () => {
      navigator.clipboard.writeText(
        removeSmartPopupParam(window.location.href)
      );
      const desc = buttonConfig.value.copy.desc;
      buttonConfig.value.copy.desc = "复制成功！";
      setTimeout(() => {
        buttonConfig.value.copy.desc = desc;
      }, 1000);
    },
  },
  open: {
    icon: '<svg viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M12 13a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v3.5a.5.5 0 0 0 1 0V3h9v9H8.5a.5.5 0 0 0 0 1zM9 6.5v3a.5.5 0 0 1-1 0V7.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 7H5.5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 .5.497" clip-rule="evenodd"></path></svg>',
    text: "open",
    desc: "新标签中打开",
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
});

const body = document.querySelector('body');

const bodySize = ref({
  width: body?.clientWidth || 0,
  height: body?.clientHeight,
});
</script>

<template>
  <vue-draggable-resizable
    :class="[
      'pointer-events-auto cursor-move',
      'flex items-center justify-center ',
      'bg-[rgba(245,245,245,0.5)] dark:bg-[rgba(10,10,10,0.5)]',
      'rounded-full shadow-2xl backdrop-blur-sm !border-1px !border-solid !border-[rgba(0,0,0,0.4)] dark:!border-[rgba(255,255,255,0.4)]',
    ]"
    :w="'auto'"
    :h="'auto'"
    :y="10"
    :x="bodySize.width - 40 -10"
    :parent="true"
    :resizable="false"
  >
    <div class="flex flex-col items-center justify-between gap-[6px] p-[4px]">
      <div
        class="tooltip tooltip-left"
        :data-tip="item.desc"
        v-for="item in buttonConfig"
      >
        <div
          :class="[
            'btn btn-circle !w-[28px] !h-[28px] !min-h-[28px]',
            'cursor-pointer flex items-center justify-center hover:scale-110 transition-all'
          ]"
          alt="item.text"
          @click="item.click"
        >
          <div class="!w-[20px] !h-[20px]" v-html="item.icon"></div>
        </div>
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<style scoped>
@import "vue-draggable-resizable/style.css";
</style>
