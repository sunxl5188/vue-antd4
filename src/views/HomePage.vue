<template>
	<div>
		<a-menu
			v-model:selectedKeys="selectedKeys"
			v-model:openKeys="openKeys"
			theme="light"
			mode="inline"
			@click="handleClick"
		>
			<a-sub-menu key="sub1" @titleClick="titleClick">
				<template #icon>
					<component :is="'MailOutlined'" />
				</template>
				<template #title>Navigation One</template>
				<a-menu-item key="1">Option 1</a-menu-item>
				<a-menu-item key="2">Option 2</a-menu-item>
			</a-sub-menu>
		</a-menu>
		<div id="echartsBar"></div>
		<div id="echartsLine"></div>
		<!-- <xl-upload :attribute="{ action: 'http://www.baidu.com' }"></xl-upload> -->
	</div>
</template>

<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue'
//import * as echarts from 'echarts'
//import XlUpload from '@/components/xl-upload/index.vue'

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])
const handleClick: MenuProps['onClick'] = e => {
	console.log('click', e)
}
const titleClick = (e: Event) => {
	console.log('titleClick', e)
}
</script>

<style lang="less" scoped>
#echartsLine,
#echartsBar {
	width: 100%;
	height: 1px;
}
</style>
