//https://router.vuejs.org/zh/
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: layout,
		redirect: { name: 'index' },
		children: [
			{
				path: 'index',
				name: 'index',
				component: () => import('@/views/index.vue'),
				meta: { title: '后台首页' }
			},
			{
				path: 'about',
				name: 'about',
				component: () => import('@/views/AboutPage.vue'),
				meta: { title: '关于我们', keepAlive: true }
			}
		]
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('@/views/error/ErrorPage404.vue')
	}
]

const router = createRouter({
	history: createWebHistory('/'),
	routes
})

//全局前置守卫

router.beforeEach(to => {
	//设置页面标题
	if (to.meta.title) {
		//判断是否有标题
		document.title = to.meta.title as string
	}
	// 返回 false 以取消导航
	//console.log(to, from)
	return true
})

//全局解析守卫,所有组件内守卫和异步路由组件被解析之后调用
/* router.beforeResolve(async to => {
	if (to.meta.requiresCamera) {
		// 返回 false 以取消导航
		return true
	}
}) */
//全局后置钩子~它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用
/* router.afterEach((to, from) => {
	console.log(to, from)
}) */
export default router
