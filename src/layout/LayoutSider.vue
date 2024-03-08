<template>
	<a-layout-sider>
		<a-menu
			v-model:openKeys="state.openKeys"
			v-model:selectedKeys="state.selectedKeys"
			mode="inline"
			theme="dark"
			:inline-collapsed="state.collapsed"
			:items="items"
			@select="handleSelect"
		></a-menu>
	</a-layout-sider>
</template>

<script setup lang="ts" name="LayoutSider">
import {
	PieChartOutlined,
	MailOutlined,
	DesktopOutlined,
	InboxOutlined,
	AppstoreOutlined
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = reactive({
	collapsed: false,
	selectedKeys: ['1'],
	openKeys: ['sub1'],
	preOpenKeys: ['sub1']
})
const items = reactive([
	{
		label: '工作台',
		title: '工作台', //设置收缩时展示的悬浮标题
		key: '/',
		icon: () => h(PieChartOutlined)
	},
	{
		label: '仪表盘',
		title: '仪表盘',
		key: '/dashboard',
		icon: () => h(DesktopOutlined),
		children: [
			{
				label: '欢迎页',
				key: '/dashboard/welcome'
			},
			{
				label: '分析页',
				key: '/dashboard/analysis'
			},
			{
				label: '监控页',
				key: '/dashboard/monitor'
			}
		]
	},
	{
		label: '表单页',
		title: '表单页',
		key: '/form',
		icon: () => h(InboxOutlined),
		children: [
			{
				label: '基础表单',
				key: '/form/base-form'
			},
			{
				label: '分步表单',
				key: '/form/step-form'
			},
			{
				label: '高级表单',
				key: '/form/advanced-form'
			}
		]
	},
	{
		label: '列表页',
		title: '列表页',
		key: '/list',
		icon: () => h(MailOutlined),
		children: [
			{
				label: '查询表格',
				key: '/list/table-list'
			},
			{
				label: '标准列表',
				key: '/list/basic-list'
			},
			{
				label: '卡片列表',
				key: '/list/card-list'
			}
		]
	},
	{
		label: '详细页',
		title: '详细页',
		key: '/profile',
		icon: () => h(AppstoreOutlined),
		children: [
			{
				label: '基础详情页',
				key: '/profile/basic'
			},
			{
				label: '高级详情页',
				key: '/profile/advanced'
			}
		]
	},
	{
		label: '异常页',
		title: '异常页',
		key: '/error',
		icon: () => h(AppstoreOutlined),
		children: [
			{
				label: '403',
				key: '/error/error-403'
			},
			{
				label: '404',
				key: '/error/error-404'
			},
			{
				label: '500',
				key: '/error/error-500'
			}
		]
	},
	{
		label: '结果页',
		title: '结果页',
		key: '/result',
		icon: () => h(AppstoreOutlined),
		children: [
			{
				label: '成功页',
				key: '/result/success'
			},
			{
				label: '失败页',
				key: '/result/fail'
			}
		]
	},
	{
		label: '个人中心',
		title: '个人中心',
		key: '/account',
		icon: () => h(AppstoreOutlined),
		children: [
			{
				label: '个人中心',
				key: '/account/center'
			},
			{
				label: '个人设置',
				key: '/account/settings'
			}
		]
	},
	{
		label: '系统管理',
		title: '系统管理',
		key: '/system',
		icon: () => h(AppstoreOutlined),
		children: [
			{
				label: '角色管理',
				key: '/system/role-list'
			},
			{
				label: '权限管理',
				key: '/system/permission-list'
			}
		]
	}
])

const handleSelect = ({ key }: { key: string }) => {
	router.push(key)
}
</script>

<style scoped land="scss"></style>
