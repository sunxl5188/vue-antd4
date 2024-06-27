<template>
	<div>
		<!-- <MapContainer /> -->
		<!-- <xl-upload :attribute="{ action: 'http://www.baidu.com' }"></xl-upload> -->
	</div>
</template>

<script setup lang="ts">
//import * as echarts from 'echarts'
//import XlUpload from '@/components/xl-upload/index.vue'
//import MapContainer from '@/components/MapContainer.vue'
const dataSource = ref<any>([])
// 生成指定长度的随机中文字符
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const randomChineseChar = (length: number): string => {
	let result = ''
	const base = 0x4e00 // 汉字编码的起始位置
	const range = 0x9fff - base + 1 // 汉字编码的范围
	for (let i = 0; i < length; i++) {
		const code = base + Math.floor(Math.random() * range)
		result += String.fromCharCode(code)
	}
	return result
}

for (let i = 0; i < 1; i++) {
	dataSource.value.push({
		id: i + 1,
		name: `名称${i + 1}`,
		message: randomChineseChar(Number((Math.random() * 100).toFixed(0)))
	})
}
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
