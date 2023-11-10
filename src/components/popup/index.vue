<template>
	<u-popup v-model="popupAttribute.show" v-bind="popupAttribute" @open="handlerOpen" @close="handlerClose">
		<!--测试-->
		<Test v-if="popupAttribute.test" :dataMsg="popupAttribute.parameter" />
	</u-popup>
</template>

<script setup>
  import Test from './modules/test.vue';
  import { computed } from 'vue'
  import { event_type, popupType } from '@/constants'
  import { getInject } from "@/hook/usePageInfo"

  const sourceData = { ...popupType, show: false }
  const parameter = getInject(event_type.popup)
	// 弹窗属性
	const popupAttribute = computed(() => {
		return Object.assign({}, sourceData, parameter.value);
	});
	const handlerOpen = () => {
		console.log('弹窗打开');
	};
	const handlerClose = () => {
    console.log('弹窗关闭')
    parameter.value = sourceData
	};
</script>

<style lang="scss" scoped></style>
