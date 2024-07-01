<template>
	<div class="ml-40 mr-40">
		<Cascader v-model:value="value" v-model:label="label" :options="options" />
		<div>{{ value }}{{ label }}</div>
		<!-- <BaseForm /> -->
		<!-- <MapContainer /> -->
		<!-- <xl-upload :attribute="{ action: 'http://www.baidu.com' }"></xl-upload> -->
	</div>
</template>

<script setup lang="ts">
//import BaseForm from '@/components/form/BaseForm.vue'
//import * as echarts from 'echarts'
//import XlUpload from '@/components/xl-upload/index.vue'
//import MapContainer from '@/components/MapContainer.vue'
const value = ref([])
const label = ref([])
const options = [
	{
		value: 'zhejiang',
		label: 'Zhejiang',
		children: [
			{
				value: 'hangzhou',
				label: 'Hangzhou',
				children: [
					{
						value: 'xihu',
						label: 'West Lake'
					}
				]
			}
		]
	},
	{
		value: 'jiangsu',
		label: 'Jiangsu',
		children: [
			{
				value: 'nanjing',
				label: 'Nanjing',
				children: [
					{
						value: 'zhonghuamen',
						label: 'Zhong Hua Men'
					}
				]
			}
		]
	}
]
</script>

<style lang="less" scoped>
.item {
	box-sizing: border-box;
	line-height: 24px;
	background: #dedede;
	border-bottom: 1px solid #ccc;
	padding: 15px;
	margin: 10px 0;
}
</style>
