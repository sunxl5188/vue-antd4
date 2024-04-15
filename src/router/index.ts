//https://router.vuejs.org/zh/
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'
import cookies from '@/utils/cookies'
import { useUserStore } from '@/store/userStore'

const whiteList: Array<string> = ['/login', '/register', '/recover']
export const Layout = layout

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * 1                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * 2                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * 3                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

//静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: layout,
		redirect: { name: 'index' },
		children: [
			{
				path: 'index',
				name: 'index', //名称要与组件名称相同,用于keepAlive缓存页面
				component: () => import('@/views/index.vue'),
				meta: { title: '工作台' }
			}
		]
	},
	{
		path: '/login',
		name: 'LoginPage',
		component: () => import('@/views/LoginPage.vue'),
		meta: { title: '用户登录' }
	},
	{
		path: '/recover',
		name: 'RecoverPassword',
		component: () => import('@/views/RecoverPassword.vue'),
		meta: { title: '找回密码' }
	},
	{
		path: '/register',
		name: 'RegisterAccount',
		component: () => import('@/views/RegisterAccount.vue'),
		meta: { title: '注册账号' }
	}
]
//通配路由
export const pathMatch = [
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('@/views/error/ErrorPage404.vue')
	}
]

//动态路由
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/dashboard',
		name: 'dashboard',
		component: layout,
		redirect: { name: 'welcome' },
		meta: { title: '仪表盘', keepAlive: true },
		permissions: ['dashboard:welcome:edit'],
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
	},
	{
		path: '/form',
		name: 'form',
		component: layout,
		redirect: { name: 'base-form' },
		meta: { title: '表单页', keepAlive: true },
		permissions: ['form:list:edit'],
		children: [
			{
				path: 'base-form',
				name: 'BaseForm',
				component: () => import('@/views/form/BaseForm.vue'),
				meta: { title: '基础表单', keepAlive: true }
			},
			{
				path: 'step-form',
				name: 'StepForm',
				component: () => import('@/views/form/StepForm.vue'),
				meta: { title: '分步表单', keepAlive: true }
			},
			{
				path: 'advanced-form',
				name: 'AdvancedForm',
				component: () => import('@/views/form/AdvancedForm.vue'),
				meta: { title: '高级表单', keepAlive: true }
			}
		]
	},
	{
		path: '/list',
		name: 'list',
		component: layout,
		redirect: { name: 'table-list' },
		meta: { title: '表单页', keepAlive: true },
		permissions: ['list:list:edit'],
		children: [
			{
				path: 'table-list',
				name: 'TableList',
				component: () => import('@/views/table/TableList.vue'),
				meta: { title: '基础表单', keepAlive: true }
			},
			{
				path: 'basic-list',
				name: 'BasicList',
				component: () => import('@/views/table/BasicList.vue'),
				meta: { title: '标准列表', keepAlive: true }
			},
			{
				path: 'card-list',
				name: 'CardList',
				component: () => import('@/views/table/CardList.vue'),
				meta: { title: '卡片列表', keepAlive: true }
			}
		]
	},
	{
		path: '/profile',
		name: 'profile',
		component: layout,
		redirect: { name: 'basic' },
		meta: { title: '详细页', keepAlive: true },
		permissions: ['profile:list:edit'],
		children: [
			{
				path: 'basic',
				name: 'BasicPage',
				component: () => import('@/views/profile/BasicPage.vue'),
				meta: { title: '基础表单', keepAlive: true }
			},
			{
				path: 'advanced',
				name: 'AdvancedPage',
				component: () => import('@/views/profile/AdvancedPage.vue'),
				meta: { title: '标准列表', keepAlive: true }
			}
		]
	},
	{
		path: '/error',
		name: 'error',
		component: layout,
		redirect: { name: 'error-403' },
		meta: { title: '异常页', keepAlive: true },
		permissions: ['error:list:edit'],
		children: [
			{
				path: 'error-403',
				name: 'error-403',
				component: () => import('@/views/error/ErrorPage403.vue'),
				meta: { title: '403', keepAlive: true }
			},
			{
				path: 'error-404',
				name: 'error-404',
				component: () => import('@/views/error/ErrorPage404.vue'),
				meta: { title: '404', keepAlive: true }
			},
			{
				path: 'error-500',
				name: 'error-500',
				component: () => import('@/views/error/ErrorPage500.vue'),
				meta: { title: '500', keepAlive: true }
			}
		]
	},
	{
		path: '/result',
		name: 'result',
		component: layout,
		redirect: { name: 'success' },
		meta: { title: '结果页', keepAlive: true },
		permissions: ['result:list:edit'],
		children: [
			{
				path: 'success',
				name: 'SuccessPage',
				component: () => import('@/views/result/SuccessPage.vue'),
				meta: { title: '成功页', keepAlive: true }
			},
			{
				path: 'fail',
				name: 'FailPage',
				component: () => import('@/views/result/FailPage.vue'),
				meta: { title: '失败页', keepAlive: true }
			}
		]
	},
	{
		path: '/account',
		name: 'account',
		component: layout,
		redirect: { name: 'center' },
		meta: { title: '个人中心', keepAlive: true },
		permissions: ['account:list:edit'],
		children: [
			{
				path: 'center',
				name: 'CenterPage',
				component: () => import('@/views/account/CenterPage.vue'),
				meta: { title: '个人中心', keepAlive: true }
			},
			{
				path: 'settings',
				name: 'SettingPage',
				component: () => import('@/views/account/SettingPage.vue'),
				meta: { title: '个人设置', keepAlive: true }
			}
		]
	},
	{
		path: '/system',
		name: 'system',
		component: layout,
		redirect: { name: 'role-list' },
		meta: { title: '系统管理', keepAlive: true },
		roles: ['admin'],
		children: [
			{
				path: 'role-list',
				name: 'RoleList',
				component: () => import('@/views/system/RoleList.vue'),
				meta: { title: '角色管理', keepAlive: true }
			},
			{
				path: 'permission-list',
				name: 'PermissionList',
				component: () => import('@/views/system/PermissionList.vue'),
				meta: { title: '个人设置', keepAlive: true }
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory('/'),
	routes: constantRoutes,
	scrollBehavior(to, form, savedPosition) {
		if (to && form) {
			// ....
		}
		if (savedPosition) {
			return savedPosition
		} else {
			return { top: 0, left: 0 }
		}
	}
})

//全局前置守卫

router.beforeEach(function (to, from) {
	const store = useUserStore()
	//设置页面标题
	if (to.meta.title) {
		//判断是否有标题
		document.title = to.meta.title
	}
	if (from) {
		// ...
	}
	if (cookies.get('token')) {
		if (to.path === '/login') {
			return { path: '/' }
		} else if (store.routes.length === 0) {
			store.generateRoutes()
			/* store
				.getInfo()
				.then(() => {
					store.generateRoutes().then(accessRoutes => {
						// 根据roles权限生成可访问的路由表
						router.addRoutes(accessRoutes) // 动态添加可访问路由表
						return { ...to, replace: true } // hack方法 确保addRoutes已完成
					})
				})
				.catch(err => {
					store.dispatch('LogOut').then(() => {
						return { path: '/' }
					})
				}) */
		} else {
			return true
		}
	} else if (whiteList.indexOf(to.path) !== -1) {
		// 在免登录白名单，直接进入
		return true
	} else {
		return { path: `/login?redirect=${to.fullPath}` } // 否则全部重定向到登录页
	}
})

//全局解析守卫,所有组件内守卫和异步路由组件被解析之后调用
/* router.beforeResolve(async to => {
	if (to.meta.requiresCamera) {
		// 返回 false 以取消导航
		return true
	}
}) */
//全局后置钩子~它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
/* router.afterEach((to: RouteLocationNormalized) => {
	console.log(store)
	if (to.meta.keepAlive) {
		console.log(to.name)
	}
}) */
export default router
