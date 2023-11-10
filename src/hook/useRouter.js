import { TABBAR } from '@/constants';
import pagesJson from '@/pages.json';
import throttle from 'lodash.throttle';
import { getToUrl } from "@/utils"

const getCurrentPage = () => {
	let pages = getCurrentPages();
	return pages[pages.length - 1];
};

// 通过url获取pages里面的具体信息
const getPageMeta = ({ url }) => {
	const { pages = [], subPackages = [] } = pagesJson;
	const subPages = subPackages.reduce((array, { pages }) => {
		return array.concat(pages);
	}, []);
	const allPages = [].concat(pages).concat(subPages);
	if (url === '/') {
		return allPages.find((item) => item.path === 'pages/tabBar/index');
	}
	return allPages.find((item) => url.endsWith(item.path));
};

const _go = ({
	url,
	options = {}
}) => {
	const [page] = url.split('?');

    // 为true的话就是需要登录而且目前没有登录
    if(getToUrl({ url: page })){
        uni.showModal({
            title: '提示',
            content: '登录后才可操作',
            confirmText: '去登录',
            success: ({ confirm }) => {
                if (confirm) {
                    uni.reLaunch({
                        url: '/pages/login/index'
                    });
                }
            }
        })
        return false
    }

	// 跳转底部导航
	if (TABBAR.includes(page)) {
		uni.switchTab({
			url
		});
		return;
	}
	const { redirect = false, reLaunch = false, animationDuration = 300, animationType = 'pop-in' } = options;
	// 使用redirect跳转
	if (redirect) {
		uni.redirectTo({
			url
		});
		return;
	}
	// 使用reLaunch跳转
	if (reLaunch) {
		uni.reLaunch({
			url
		});
		return;
	}

	uni.navigateTo({
		url,
		...{ animationDuration, animationType }
	});
};

// 限流 防止重复点击
const go = throttle(_go, 300);

export { go, getCurrentPage, getPageMeta };
