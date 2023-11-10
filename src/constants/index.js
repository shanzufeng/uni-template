const TABBAR = ['/pages/tabBar/index', '/pages/tabBar/my'];

const popupType = {
	test: false
};

const errorCode_type = {
	UNLOGIN: '未登录'
};

const timeout = 3000 // 超时时间

const couponList = {
	MONEY_VOUCHER: '平台现金抵用',
	MUST_HIT: '必中',
	FREE_SHIPING: '免邮',
	FREE_MONEY: '邮费抵用'
};

const event_type = {
	follow: 'btn_click_follow',
	getScrollInfo: 'getScrollInfo',
	popup: 'popupAttribute',
    point: 'pointData'
};

const cardTypeList = [
	{ value: 0, label: '储蓄卡' },
	{ value: 1, label: '信用卡' }
];

const pageInfo = {
	pageNum: 1,
	pageSize: 10
};

const payType = {
    scan: 'scan'
}

const errorCodeInfo = {
    auth: 'E00080003',
    unLogin: 'UNLOGIN'
};


const isCheckLoginPage = ['/index-subpackages/', '/user-subpackages/', '/setting-packages/'];

export { timeout, couponList, errorCodeInfo, TABBAR, cardTypeList, isCheckLoginPage, popupType, event_type, pageInfo, payType };
