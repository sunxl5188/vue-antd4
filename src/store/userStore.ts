import { defineStore } from 'pinia'
import cookie from '@/utils/cookies'
import loginJson from '@/data/login.json'
import routerJSON from '@/data/getRouters.json'

export const useUserStore = defineStore('user', {
	state: () => ({
		token: <string>'',
		userInfo: <any>{},
		code: <string>'',
		permissions: <any>[],
		routes: <any>[]
	}),
	getters: {},
	actions: {
		//登录
		login(data: any, type: number): Promise<boolean> {
			return new Promise((resolve, reject) => {
				//账户登录
				if (type === 1) {
					if (data.userName === 'admin' && data.password === 'admin') {
						this.setInfo(loginJson)
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
						this.setInfo(loginJson)
						resolve(true)
					} else {
						reject(new Error('登录失败'))
					}
				}
			})
		},
		// 存储用户信息
		setInfo(data: any): void {
			cookie.set('token', data?.token)
			this.token = data?.token
			this.userInfo = data?.user
			this.permissions = data?.permissions
		},
		//生成路由
		generateRoutes(): any {
			const data = routerJSON.data
			console.log(data)
			/* const sdata = JSON.parse(JSON.stringify(data))
			const rdata = JSON.parse(JSON.stringify(data))
			const sidebarRoutes = filterAsyncRouter(sdata)
			const rewriteRoutes = filterAsyncRouter(rdata, false, true)
			const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
			rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
			router.addRoutes(asyncRoutes)
			commit('SET_ROUTES', rewriteRoutes)
			commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
			commit('SET_DEFAULT_ROUTES', sidebarRoutes)
			commit('SET_TOPBAR_ROUTES', sidebarRoutes)
			resolve(rewriteRoutes) */
			// 向后端请求路由数据
			//return new Promise((resolve, reject) => {})
		}
	},
	persist: {
		//key: 'user',
		storage: localStorage,
		paths: ['count', 'userInfo']
	}
})
