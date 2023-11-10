import { errorCodeInfo, isCheckLoginPage } from "@/constants"
import { getCurrentPage, getPageMeta, go } from "@/hook/useRouter"
import store from '@/store/modules/countStore'

const device = uni.getSystemInfoSync();
/**
 * 弹窗的显示
 * @param obj
 */
const showModal = (obj = {}) => {
    const { errorCode, errorStatusFun= ()=>{} } = obj
    uni.showModal({
        title: '提示',
        content: '请先进行实名认证',
        confirmText: '去认证',
        success: ({ confirm }) => {
            confirm && errorStatusFun({ errorCode });
        },
        ...obj
    });
};

/**
 判断图片是否有效
 */
const isValidImg = (obj = {}) => {
    const { imgUrl = '' } = obj;
    return new Promise((resolve, reject) => {
        uni.getImageInfo({
            src: imgUrl,
            success: function (res) {
                // 图片信息获取成功，是有效图片
                resolve(true);
            },
            fail: function (err) {
                // 图片信息获取失败，不是有效图片
                resolve(false);
            }
        });
    });
};

/**
 * 检查网络
 */
async function checkNetwork() {
    const networkStatus = await uni.getNetworkType();
    if (networkStatus.networkType === 'none') {
        return Promise.resolve(false);
    }
    return Promise.resolve(true);
}

// 判断当前系统
const os = device.platform;

/**
 * 判断是否是pc端
 * @returns {boolean}
 */
const isPc = ()=> {
    const system = os.toLowerCase();
    return system === 'windows' || system === 'macos'
};

/**
 * 深度合并对象
 * @param a
 * @param b
 * @param fn
 * @returns {*}
 */
const deepMerge = (a, b, fn) => [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce((acc, key) => ({ ...acc, [key]: fn(key, a[key], b[key]) }), {});

const cleanData = (Obj = {}) => {
    const { callback = () => {}, isRun = false } = Obj;
    const userStore = store();
    if (userStore.info?.sysUser?.userCode || isRun) {
        // 登录状态才执行
        const store = [userStore];
        uni.clearStorage();
        store.forEach((item) => {
            item.$reset();
        });
        callback?.();
    }
};



const isContinue = (to) => {
    const item = getPageMeta({ url: to.url });
    const useStore = store();
    const { info } = useStore;
    // console.log(info?.sysUser?.userCode ? '已经登录了' : '没登录')
    // console.log(item?.meta?.auth ? '需要登录' : '不需要登录')
    const flag = item?.meta?.auth && !info?.sysUser?.userCode;
    if (flag) {
        // useStore.setPopupAttribute({
        // 	show: true,
        // 	loginModule: true,
        // 	mask: false,
        // 	mode: 'center',
        // 	'z-index': -1
        // });
    }
    return flag;
};

/**
 * 获取跳转地址并且检查是否需要登录
 * @param obj
 * @returns {*}
 */
const getToUrl = (obj = {}) => {
    const { url = '' } = obj;
    if(url.startsWith('/pages')){
        return isContinue({ url });
    }
    let to;
    isCheckLoginPage.some((item)=>{
        const [,toUrl] = url.split(item)
        to = toUrl;
        return toUrl
    })
    return isContinue({ url });
}

const isArray = (val) => {
    return val && Array.isArray(val);
};

const is = (val, type) => {
    return toString.call(val) === `[object ${type}]`;
};

const isObject = (val)=>{
    return val !== null && is(val, 'Object');
}

const isEmptyObject = (obj)=> {
    return Object.keys(obj).length === 0;
}

/**
 * 获取当前页面传的参数，类似onLoad方式获取参数
 * @returns {*}
 */
const getPageOptions = () => {
    const pages = getCurrentPage();
    return pages?.$page?.options;
}

/**
 * 报错之后的执行逻辑
 * @param errorCode
 */
const afterErrorFun = ({ errorCode }) => {
    // 未登录
    if (errorCode === 'UNLOGIN') {
        // #ifndef MP-WEIXIN
        cleanData({
            isRun: true,
            callback: () => {
                go({
                    url: '/pages/login/index',
                    options: {
                        reLaunch: true
                    }
                });
            }
        });
        // #endif
    } else if (errorCode === errorCodeInfo.auth) {
        setTimeout(() => {
            go({ url: '/user-subpackages/realName/index', options: { animationType: 'zoom-out' } });
        }, 500);
    }
};

export { isValidImg, getToUrl, showModal, afterErrorFun, isEmptyObject, isPc, checkNetwork, os, getPageOptions, deepMerge, cleanData, isObject, isArray };
