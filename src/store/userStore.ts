import { defineStore } from 'pinia'
import $cookies from '@/utils/cookies'
import loginJson from '@/data/login.json'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import auth from '@/utils/auth'
import { dynamicRoutes } from '@/router'

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
			$cookies.set('token', data?.token)
			this.token = data?.token
			this.userInfo = data?.user
			this.roles = data?.roles
			this.permissions = data?.permissions
		},
		//生成路由
		generateRoutes(): any {
			const router = useRouter()
			const asyncRoutes = this.filterDynamicRoutes(dynamicRoutes)
			asyncRoutes.push({
				path: '/:pathMatch(.*)*',
				name: 'NotFound',
				component: () => import('@/views/error/ErrorPage404.vue')
			})
			asyncRoutes.forEach((item: RouteRecordRaw) => {
				router.addRoute(item)
			})

			/* commit('SET_ROUTES', rewriteRoutes)
			commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
			commit('SET_DEFAULT_ROUTES', sidebarRoutes)
			commit('SET_TOPBAR_ROUTES', sidebarRoutes)
			resolve() */
		},
		// 动态路由遍历，验证是否具备权限
		filterDynamicRoutes(routes: RouteRecordRaw[]) {
			const res: RouteRecordRaw[] = []
			routes.forEach(route => {
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
