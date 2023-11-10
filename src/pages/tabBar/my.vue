<template>
	<Layout class="h-full bgColors_248">
		<view class="bgColors_46 h-36 fixed-1 w-full"></view>
		<view class="absolute top-8 w-full distance-top">
			<!--头像-->
			<view class="flex-center1 pl-8">
				<u-avatar size="128" :src="src"></u-avatar>
				<view class="ml-4 text-white font-1 font-medium">
					{{ hidePhoneNumber(userInfo?.userName) || '点击登录' }}
				</view>
			</view>
			<!--其他按钮-->
			<view class="px-3 mt-3">
				<u-cell-group class="bg-white rounded_0.31 overflow-hidden">
          <u-cell-item icon="checkmark-circle" title="实名认证"></u-cell-item>
          <u-cell-item icon="lock" title="设置支付密码"></u-cell-item>
					<u-cell-item icon="map" title="收货地址"></u-cell-item>
					<u-cell-item icon="chat" title="联系我们"></u-cell-item>
					<u-cell-item icon="question-circle" title="帮助中心"></u-cell-item>
					<u-cell-item icon="order" title="关于我们"></u-cell-item>
					<u-cell-item v-if="userInfo?.userCode" icon="account" title="退出登录"></u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</Layout>
</template>

<script setup>
import { getUserInfo, pageSomeFun } from '@/hook/usePageInfo'

const src = 'https://img.yzcdn.cn/vant/cat.jpeg';
	const { userInfo, useStore } = getUserInfo();
	const { hidePhoneNumber } = pageSomeFun();

</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}
</style>

