import { defineStore } from 'pinia'
import $cookies from '@/utils/cookies'
import loginJson from '@/data/login.json'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import auth from '@/utils/auth'
import { constantRoutes, dynamicRoutes } from '@/router'
import type { ItemType } from 'ant-design-vue'

export const useUserStore = defineStore('user', {
	state: () => ({
		token: <string>'',
		userInfo: <any>{},
		code: <string>'',
		routes: <any>[],
		roles: <any>[],
		permissions: <any>[],
		sidebarRouters: <any>[] //导航菜单路由
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
			return new Promise(resolve => {
				const router = useRouter()
				const asyncRoutes = this.filterDynamicRoutes(dynamicRoutes)
				const i = constantRoutes.findIndex(o => o.name === 'layout')
				asyncRoutes.forEach((item: RouteRecordRaw) => {
					router.addRoute(item)
					constantRoutes[i].children?.push(item)
				})
				console.log(constantRoutes, '88888')
				//生成导航菜单
				this.sidebarRouters = this.generateSidebar(asyncRoutes)
				this.routes = this.sidebarRouters
				resolve(asyncRoutes)
			})
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
		},
		//生成导航菜单
		generateSidebar(route: RouteRecordRaw[], path?: string) {
			const sidebar: ItemType[] = []
			route?.forEach(item => {
				let children = undefined
				const meta = item.meta as any
				const icon = meta?.icon ? meta?.icon : undefined
				if (item.children?.length) {
					children = this.generateSidebar(item.children, item.path) || undefined
				}
				sidebar.push({
					label: item.meta?.title,
					title: item.meta?.title,
					key: path ? path + '/' + item.path : item.path,
					icon,
					children
				})
			})
			return sidebar
		}
	},
	persist: {
		//key: 'user',
		storage: localStorage,
		paths: ['token', 'userInfo', 'roles', 'permissions', 'sidebarRouters']
	}
})
