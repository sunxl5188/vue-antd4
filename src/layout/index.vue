<template>
	<a-layout class="h-screen">
		<a-layout-header></a-layout-header>
		<a-layout>
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
			<a-layout-content class="bg-gray-100 p-4">
				<router-view />
				<!-- <router-view v-slot="{ Component }">
					<transition>
						<keep-alive :include="['about']">
							<component :is="Component"></component>
						</keep-alive>
					</transition>
				</router-view> -->
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script setup lang="ts" name="LayoutIndex">
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
		key: '/',
		icon: () => h(PieChartOutlined),
		label: '首页',
		title: '首页'
	},
	{
		key: '/about',
		icon: () => h(DesktopOutlined),
		label: '关于我们',
		title: '关于我们'
	},
	{
		key: '3',
		icon: () => h(InboxOutlined),
		label: 'Option 3',
		title: 'Option 3'
	},
	{
		key: 'sub1',
		icon: () => h(MailOutlined),
		label: 'Navigation One',
		title: 'Navigation One',
		children: [
			{
				key: '5',
				label: 'Option 5',
				title: 'Option 5'
			},
			{
				key: '6',
				label: 'Option 6',
				title: 'Option 6'
			},
			{
				key: '7',
				label: 'Option 7',
				title: 'Option 7'
			},
			{
				key: '8',
				label: 'Option 8',
				title: 'Option 8'
			}
		]
	},
	{
		key: 'sub2',
		icon: () => h(AppstoreOutlined),
		label: 'Navigation Two',
		title: 'Navigation Two',
		children: [
			{
				key: '9',
				label: 'Option 9',
				title: 'Option 9'
			},
			{
				key: '10',
				label: 'Option 10',
				title: 'Option 10'
			},
			{
				key: 'sub3',
				label: 'Submenu',
				title: 'Submenu',
				children: [
					{
						key: '11',
						label: 'Option 11',
						title: 'Option 11'
					},
					{
						key: '12',
						label: 'Option 12',
						title: 'Option 12'
					}
				]
			}
		]
	}
])

const handleSelect = ({ key }: { key: string }) => {
	router.push(key)
}
</script>
