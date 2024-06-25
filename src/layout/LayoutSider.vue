<template>
	<a-layout-sider>
		<a-menu
			v-model:openKeys="state.openKeys"
			v-model:selectedKeys="state.selectedKeys"
			mode="inline"
			theme="dark"
			:inline-collapsed="state.collapsed"
			@select="handleSelect"
		>
			<template v-for="(item, i) in store.sidebarRouters" :key="i">
				<a-menu-item v-if="!item.children" :key="item.key">
					{{ item.label }}
				</a-menu-item>
				<a-sub-menu v-if="item.children" :key="item.key">
					<template v-if="item.icon" #icon>
						<component :is="item.icon" />
					</template>
					<template #title>{{ item.label }}</template>
					<a-menu-item v-for="subItem in item.children" :key="subItem.key">
						{{ subItem.label }}
					</a-menu-item>
				</a-sub-menu>
			</template>
		</a-menu>
	</a-layout-sider>
</template>

<script setup lang="ts" name="LayoutSider">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'

const router = useRouter()
const store = useUserStore()
const state = reactive({
	collapsed: false,
	selectedKeys: [],
	openKeys: [],
	preOpenKeys: []
})

const handleSelect = ({ key }: { key: string }) => {
	router.push(key)
}

onMounted(() => {
	console.log([...store.sidebarRouters], '========')
})
</script>
