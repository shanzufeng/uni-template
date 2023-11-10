import { defineStore } from 'pinia';
import userApi from '@/api/modules/user';

const useStore = defineStore('storeId', {
	unistorage: {
		key: 'storeId',
		paths: ['count', 'info']
	},
	// arrow function recommended for full type inference
	state: () => ({
		// all these properties will have their type inferred automatically
		count: 0,
		info: {}
	}),
	getters: {},
	actions: {
		// 获取用户信息
		async getUsrInfoFun() {
			this.info = await userApi.getUsrInfo();
            return this.info
		},
        setCount (val){
            this.count = val
        }
	}
});

export default useStore;
