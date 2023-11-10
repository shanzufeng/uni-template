<template>
  <scroll-view v-bind="attrs" class="width-full" :scroll-top="scrollTopValue" scroll-with-animation scroll-y @scroll="handlerScroll">
    <slot />
    <!--全局弹窗-->
    <Popup />
    <!--回到顶部-->
    <u-back-top :scroll-top="scrollTop" @tap="resetScrollTop"></u-back-top>
  </scroll-view>
</template>

<script setup>
import Popup from '@/components/popup/index.vue';
import { ref, useAttrs } from 'vue';
import { scrollViewInfo } from '@/hook/usePageInfo'

const scrollTopValue = ref(0);
const attrs = useAttrs();
const resetScrollTop = () => {
  scrollTopValue.value = scrollTop.value
  setTimeout(()=>{
    scrollTopValue.value = 0
    scrollTop.value = 0
  })
}
// 页面设置高度才会生效
const { scrollTop, handlerScroll } = scrollViewInfo();
</script>

<style lang="scss" scoped></style>

