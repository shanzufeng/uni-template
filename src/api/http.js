import axios from 'axios';
import { getFullURL, baseURL } from '@/utils/http';
import { afterErrorFun, cleanData, showModal } from '@/utils'
import { errorCodeInfo, timeout } from "@/constants"

const instance = axios.create({
	baseURL,
	adapter(config) {
		const { url, method, data, params, headers, baseURL, paramsSerializer } = config;
		return new Promise((resolve, reject) => {
			uni.request({
				method: method.toUpperCase(),
				url: getFullURL(baseURL || '', url, params, paramsSerializer),
				header: headers,
				data,
                timeout,
				dataType: 'json',
				responseType: config.responseType,
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
                    uni.hideLoading();
					reject(err);
				}
			});
		});
	}
});

/**
 * 请求拦截
 */
instance.interceptors.request.use((config) => {
	const { method } = config;
	// 附带鉴权的token
	const headers = {
		token: uni.getStorageSync('token')
	};
	// 不缓存get请求
	if (method === 'get') {
		headers['Cache-Control'] = 'no-cache';
	}
	uni.showLoading({
		title: '加载中',
		mask: true,
		fail: () => {
			uni.hideLoading();
		}
	});

	return {
		...config,
		headers
	};
});

/**
 * 响应拦截
 */
instance.interceptors.response.use((v) => {
	const { data = {} } = v || {};
	const { dataObject, success, errorMessage, errorCode } = data || {};
	uni.hideLoading();
	if (success) {
		return dataObject;
	}
	if([errorCode].includes(errorCodeInfo.unLogin)){
        cleanData({ isRun: true });
        showModal({ errorCode, title: '提示', content: '请先进行登录', confirmText: '去登录' });
    } else {
		uni.showToast({
			title: errorMessage || '未知错误',
			icon: 'none'
		});
		afterErrorFun({ errorCode });
	}
	return Promise.reject({ errorCode });
});

export default instance;
