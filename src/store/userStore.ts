import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({ token: '', userInfo: {}, code: '' }),
	getters: {},
	actions: {
		//登录
		login(data: any, type: number) {
			return new Promise((resolve, reject) => {
				//账户登录
				if (type === 1) {
					if (data.userName === 'admin' && data.password === 'admin') {
						resolve(true)
					} else {
						reject(new Error('登录失败'))
					}
				}
				//手机号登录
				if (type === 2) {
					if (
						/^1[3-9]\d{9}$|^0\d{2,3}-\d{7,8}$/.test(data.phone) &&
						data.code === this.code
					) {
						resolve(true)
					} else {
						reject(new Error('登录失败'))
					}
				}
			})
		}
	},
	persist: {
		//key: 'user',
		storage: localStorage,
		paths: ['count', 'userInfo']
	}
})
