import { onPageScroll } from '@dcloudio/uni-app';
import { provide, reactive } from 'vue';
const scroll = 'getScrollInfo';
const usePageScroll = () => {
	const scrollInfo = reactive({
		distance: 0,
		setDistance: () => {
			scrollInfo.distance = Math.random() * 100;
		}
	}); // 页面滚动距离
	provide(scroll, scrollInfo);

	// 页面滚动事件
	onPageScroll((e) => {
		scrollInfo.distance = e.scrollTop;
	});
	return {
		scrollInfo
	};
};

export { usePageScroll };
