import { computed, getCurrentInstance, inject, onUnmounted, provide, ref } from 'vue';
import { onUnload } from '@dcloudio/uni-app';
import store from '@/store/modules/countStore';
import { event_type } from '@/constants';

const getEleHeight = (query, element) => {
	return new Promise((resolve) => {
		query.select(element).boundingClientRect();
		query.exec((res) => {
			resolve(res);
		});
	});
};

const getProxy = () => {
	const { proxy } = getCurrentInstance();
	return {
		proxy
	};
};

const offEvent = (array) => {
	onUnload(() => {
		uni.$off(array, () => {
			console.log(array + '事件已经销毁');
		});
	});
	onUnmounted(() => {
		uni.$off(array, () => {
			console.log(array + '事件已经销毁');
		});
	});
};

// 用户信息的获取
const getUserInfo = () => {
	const useStore = store();
	const userInfo = computed(() => {
		const { sysUser } = useStore?.info;
		return sysUser || {};
	});
    const fuBaoNumber = computed(()=>{
        const { integral = 0 } = useStore?.info;
        return integral;
    })
	// 是否登录
	const isLogin = computed(() => {
		return userInfo.value?.userCode;
	});
	return {
		isLogin,
		userInfo,
		useStore,
        fuBaoNumber
	};
};

const pageSomeFun = () => {
	// 校验是否是手机号
	const checkMobile = (mobile) => {
		let reg = /^1[3-9]\d{9}$/;
		return reg.test(mobile);
	};
	// 校验卡号
	const isBankCardNo = (cardNo) => {
		// const reg = /^([1-9]{1})(\d{15}|\d{18})$/;
		return true;
	};

	// 校验身份证
	const isIdCardNo = (idCard) => {
		return true
	};
	// 隐藏中间手机号信息
	const hidePhoneNumber = (phoneNumber) => {
		if (checkMobile(phoneNumber)) {
			return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		}
		return phoneNumber;
	};
	const isPositiveInteger = (num) => /^\d+$/.test(num) && parseInt(num) > 0;
	const getStatusName = (statusList, type) => statusList[type];
	return {
		isIdCardNo,
		isBankCardNo,
		checkMobile,
		getStatusName,
		hidePhoneNumber,
		isPositiveInteger
	};
};

const scrollViewInfo = () => {
	// 滚动的数据
	const scrollTop = ref(0);
	offEvent(event_type.getScrollInfo);
	// 滚动监听
	const handlerScroll = (event) => {
		const detail = event.detail;
		scrollTop.value = detail?.scrollTop || 0;
		uni.$emit(event_type.getScrollInfo, { scrollTop });
	};
	const resetScrollTop = () => {
		scrollTop.value = 0;
	};
	return {
		scrollTop,
		handlerScroll,
		resetScrollTop
	};
};

const getScrollInfo = () => {
	const scrollTop = ref(0);
	const init = () => {
		uni.$on(event_type.getScrollInfo, (data) => {
			scrollTop.value = data.scrollTop.value;
		});
	};
	init();
	return {
		scrollTop
	};
};

const getProvide = (key = 'dynamicData', obj = {}) => {
	const dynamicData = ref(obj);
	provide(key, dynamicData);
	return {
		dynamicData
	};
};
const getInject = (key = 'dynamicData', defaultValue = {}) => {
	// 接收父组件的值
	return inject(key, defaultValue);
};

export { getEleHeight, getProxy, offEvent, getUserInfo, pageSomeFun, scrollViewInfo, getScrollInfo, getProvide, getInject };
