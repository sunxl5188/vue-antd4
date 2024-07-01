<template>
	<div class="ml-40 mr-40">
		<!-- <Checkbox
			v-model:value="checkList"
			v-model:label="labelList"
			all
			:options="options"
			@change="handleChange"
		/> -->
		<h1>{{ checkList1 }}</h1>
		<h1>{{ labelList1 }}</h1>
		<RadioComponent
			v-model:value="checkList1"
			v-model:label="labelList1"
			:options="options"
			@change="handleChange"
		/>
		<!-- <BaseForm /> -->
		<!-- <MapContainer /> -->
		<!-- <xl-upload :attribute="{ action: 'http://www.baidu.com' }"></xl-upload> -->
	</div>
</template>

<script setup lang="ts">
//import Checkbox from '@/components/checkbox/index.vue'
import RadioComponent from '@/components/radio/index.vue'
//import BaseForm from '@/components/form/BaseForm.vue'
//import * as echarts from 'echarts'
//import XlUpload from '@/components/xl-upload/index.vue'
//import MapContainer from '@/components/MapContainer.vue'
/* const checkList = ref(['1'])
const labelList = ref(['Apple']) */
const checkList1 = ref('1')
const labelList1 = ref('Apple')
const handleChange = () => {
	//console.log(e, i, d)
}
const options = [
	{
		label: 'Apple',
		value: '1'
	},
	{
		label: 'Pear',
		value: '2'
	},
	{
		label: 'Orange',
		value: '3'
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
