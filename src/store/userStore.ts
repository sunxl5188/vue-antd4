import { defineStore } from 'pinia'
import cookie from '@/utils/cookies'
import loginJson from '@/data/login.json'
import routerJSON from '@/data/getRouters.json'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import auth from '@/utils/auth'
import { Layout, dynamicRoutes } from '@/router'

export const useUserStore = defineStore('user', {
	state: () => ({
		token: <string>'',
		userInfo: <any>{},
		code: <string>'',
		routes: <any>[],
		roles: <any>[],
		permissions: <any>[]
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
			this.roles = data?.roles
			this.permissions = data?.permissions
		},
		//生成路由
		generateRoutes(): any {
			const router = useRouter()
			const data = routerJSON.data
			const asyncRoutes = this.filterDynamicRoutes(dynamicRoutes)
			console.log(data, '----')
			console.log(asyncRoutes)
			router.addRoute({
				path: '/dashboard',
				name: 'dashboard',
				component: Layout,
				redirect: { name: 'welcome' },
				meta: { title: '仪表盘', keepAlive: true },
				children: [
					{
						path: 'welcome',
						name: 'WelcomePage',
						component: () => import('@/views/dashboard/WelcomePage.vue'),
						meta: { title: '欢迎页', keepAlive: true }
					},
					{
						path: 'analysis',
						name: 'AnalysisPage',
						component: () => import('@/views/dashboard/AnalysisPage.vue'),
						meta: { title: '分析页', keepAlive: true }
					},
					{
						path: 'monitor',
						name: 'MonitorPage',
						component: () => import('@/views/dashboard/MonitorPage.vue'),
						meta: { title: '监控页', keepAlive: false }
					}
				]
			})
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
		},
		// 动态路由遍历，验证是否具备权限
		filterDynamicRoutes(routes: RouteRecordRaw[]) {
			const res: RouteRecordRaw[] = []
			routes.forEach(route => {
				console.log(route.permissions, route.roles)
				if (route.permissions) {
					if (auth.hasPermiOr(route.permissions)) {
						res.push(route)
					}
				} else if (route.roles) {
					if (auth.hasRoleOr(route.roles)) {
						res.push(route)
					}
				}
			})
			return res
		}
	},
	persist: {
		//key: 'user',
		storage: localStorage,
		paths: ['token', 'userInfo', 'roles', 'permissions']
	}
})
