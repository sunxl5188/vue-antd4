//https://router.vuejs.org/zh/
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/home/index.vue')
	},
	{
		path: '/admin',
		name: 'AdminHome',
		component: () => import('@/views/admin/index.vue'),
		meta: {
			title: '后台首页'
		}
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

//全局前置守卫

router.beforeEach((to, from) => {
	// 返回 false 以取消导航
	console.log(to, from)
	return false
})

//全局解析守卫,所有组件内守卫和异步路由组件被解析之后调用
router.beforeResolve(async to => {
	if (to.meta.requiresCamera) {
		// 返回 false 以取消导航
		return true
	}
})
//全局后置钩子~它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
router.afterEach((to, from) => {
	console.log(to, from)
})
export default router
