<template>
	<div>
		<MapContainer />
		<!-- https://www.vvhan.com/ant-design-menu-left.html -->
		<!-- <a-menu
			v-model:selectedKeys="selectedKeys"
			v-model:openKeys="openKeys"
			mode="inline"
		>
			<a-sub-menu key="sub1">
				<template #icon>
					<MailOutlined />
		<a-menu>
			<a-sub-menu key="1">
				<template #title>
					<-- <icon-font type="StepForwardOutlined" /> ->
					<span>菜单一</span>
					<a-menu-item key="1-2">
						<span>子菜单一</span>
					</a-menu-item>
				</template>
				<template #title>Navigation One</template>
				<a-menu-item key="1">Option 1</a-menu-item>
				<a-menu-item key="2">Option 2</a-menu-item>
			</a-sub-menu>
		</a-menu>
		<div id="echartsBar"></div>
		<div id="echartsLine"></div> -->
		<!-- <xl-upload :attribute="{ action: 'http://www.baidu.com' }"></xl-upload> -->
	</div>
</template>

<script setup lang="ts">
//import * as echarts from 'echarts'
import MapContainer from '@/components/MapContainer.vue'
//import XlUpload from '@/components/xl-upload/index.vue'

//const selectedKeys = ref<string[]>(['1'])
//const openKeys = ref<string[]>(['sub1'])

//const selectedKeys = ref<string[]>(['1'])
//const openKeys = ref<string[]>(['sub1'])

/* const echartsLine = () => {
	const myChart = echarts.init(document.getElementById('echartsLine'))
	const dayTime = [
		'5:20',
		'6:20',
		'7:20',
		'8:20',
		'9:20',
		'10:20',
		'11:20',
		'12:20',
		'13:20',
		'14:20',
		'15:20',
		'16:20',
		'17:20',
		'18:20',
		'19:20'
	]
	const data = [
		10, 85, 110, 105, 59, 118, 89, 94, 77, 113, 103, 119, 65, 87, 60
	]
	const option = {
		title: {
			text: '呼吸频率',
			subtext: '次/分',
			left: '1%'
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(0,0,0,0.9)',
			borderWidth: 0,
			textStyle: { color: '#fff' },
			formatter: '时间:{b}<br />呼吸率:{c}/分'
		},
		grid: {
			top: '18%',
			left: '5%',
			right: '15%',
			bottom: '10%'
		},
		xAxis: {
			type: 'category',
			axisLine: { show: false },
			axisLabel: { show: false },
			axisTick: { show: false },
			nameGap: 1,
			data: dayTime
		},
		yAxis: {
			type: 'value',
			//max: 120,
			splitLine: { type: 'solid', lineStyle: { color: '#ccc', opacity: 0.5 } }
		},
		visualMap: {
			type: 'piecewise',
			show: false,
			pieces: [
				{
					gt: 0,
					lte: 50,
					color: '#93CE07'
				},
				{
					gt: 50,
					lte: 90,
					color: '#FBDB0F'
				},
				{
					gt: 90,
					color: '#AC3B2A'
				}
			]
		},
		series: {
			name: '呼吸频率',
			type: 'line',
			data,
			smooth: true,
			//showSymbol: false,
			markLine: {
				silent: false,
				symbol: 'none',
				lineStyle: {
					color: '#101391',
					width: 0.5
				},
				label: { show: false },
				data: [
					{
						yAxis: 50
					},
					{
						yAxis: 90
					}
				]
			}
		}
	}
	myChart.setOption(option)
}

const echartsBar = () => {
	const myChart = echarts.init(document.getElementById('echartsBar'))
	const option = {
		title: {
			text: '在床状态',
			left: '1%'
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(0,0,0,0.9)',
			borderWidth: 0,
			textStyle: { color: '#fff' },
			formatter: function (data: any) {
				const item = data[1]
				return `时间:${item.data.time}<br />状态:${item.name}`
			}
		},
		grid: {
			top: '18%',
			left: '5%',
			right: '15%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			axisLine: { show: true, lineStyle: { color: '#ccc', opacity: 0.5 } },
			axisLabel: { show: true },
			axisTick: { show: false },
			splitLine: { show: false },
			max: 24 * 60
		},
		yAxis: {
			type: 'category',
			data: ['离床', '清醒', '浅睡', '深睡'],
			axisLine: {
				show: false,
				type: 'solid',
				lineStyle: { color: '#000' }
			},
			axisLabel: { show: true, color: '#000' },
			axisTick: { show: false },
			splitLine: { show: true }
		},
		series: [
			{
				name: 'Placeholder',
				type: 'bar',
				stack: 'Total',
				itemStyle: {
					borderColor: 'transparent',
					color: 'transparent'
				},
				emphasis: {
					itemStyle: {
						borderColor: 'transparent',
						color: 'transparent'
					}
				},
				data: [320, 360, 420, 720]
			},
			{
				name: '在床状态',
				stack: 'Total',
				type: 'bar',
				data: [
					{ value: 30, time: '05:30', itemStyle: { color: '#f00' } },
					{ value: 50, time: '06:30', itemStyle: { color: '#ff0' } },
					{ value: 60, time: '07:30', itemStyle: { color: '#000' } },
					{ value: 120, time: '12:30', itemStyle: { color: '#ccc' } }
				]
			}
		]
	}
	myChart.setOption(option)
} */

onMounted(() => {
	/* echartsLine()
	echartsBar() */
})
</script>

<style lang="less" scoped>
#echartsLine,
#echartsBar {
	width: 100%;
	height: 1px;
}
</style>
