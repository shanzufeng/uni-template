<template>
  <Layout class="h-full bgColors_247 distance-top">
    <u-button @click="handlerClick">弹窗</u-button>
    <u-button @click="toMy">跳转</u-button>
  </Layout>
</template>

<script setup>
import { getProvide } from '@/hook/usePageInfo';
import { go } from '@/hook/useRouter';
import { event_type } from "@/constants"

const { dynamicData } = getProvide(event_type.popup);

const handlerClick = () => {
  dynamicData.value = {
    show: true, test: true, mode: 'bottom'
  }
};
const toMy = () => {
  go({ url: '/pages/tabBar/my', options: { animationType: 'zoom-in' } });
}
</script>

<style lang="scss" scoped>
page {
  height: 100%;
}
</style>
