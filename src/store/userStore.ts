import { defineStore } from 'pinia'
import loginJson from '@/data/login.json'

export const useUserStore = defineStore('user', {
	state: () => ({
		token: '',
		userInfo: {},
		code: '',
		routes: <any>[]
	}),
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
		},
		// 获取用户信息
		getInfo() {
			return new Promise((resolve, reject) => {
				if (loginJson.user) {
					this.userInfo = loginJson.user
					resolve(true)
				} else {
					reject(new Error('获取用户信息失败'))
				}
			})
		},
		//生成路由
		generateRoutes(data: Array<any>) {
			this.routes = data
			// 向后端请求路由数据
			return new Promise((resolve, reject) => {})
		}
	},
	persist: {
		//key: 'user',
		storage: localStorage,
		paths: ['count', 'userInfo']
	}
})
