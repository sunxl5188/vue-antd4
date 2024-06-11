<template>
	<div>
		{{ pathData }}
		<div>
			<a-space>
				<a-button type="primary" @click="edit.createPolygon">新建</a-button>
				<a-button @click="edit.close()">结束编辑</a-button>
				<a-button @click="edit.handleSubmit">保存</a-button>
			</a-space>
		</div>
		<div id="container" class="map"></div>
	</div>
</template>

<script setup lang="ts" name="MapContainer">
import AMapLoader from '@amap/amap-jsapi-loader'
let map: any = null
let polyEditor: any = null

const pathData = ref<any[]>([])

onMounted(() => {
	;(window as any)['_AMapSecurityConfig'] = {
		securityJsCode: 'ec92c3d8d63147f4e348635a516e16a6'
	}
	AMapLoader.load({
		key: '7f96a737195a244dbf7d783ecbe8a6ef', // 申请好的Web端开发者Key，首次调用 load 时必填
		version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: ['AMap.Scale', 'AMap.PolygonEditor'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
	})
		.then(AMap => {
			map = new AMap.Map('container', {
				// 设置地图容器id
				viewMode: '3D', // 是否为3D地图模式
				zoom: 16, // 初始化地图级别
				center: [116.471354, 39.994257] // 初始化地图中心点位置
			})
			polyEditor = new AMap.PolygonEditor(map)
			edit.mapConfig()
		})
		.catch(e => {
			console.log(e)
		})
})

const nowPolygon = ref()
const edit = reactive({
	eid: -1,
	mapConfig() {
		polyEditor._opt.createOptions = {
			// 创建区域的样式
			fillColor: '#409EFF', // 多边形填充颜色，使用16进制颜色代码赋值，如：#00B2D5
			fillOpacity: 0.3, // 多边形填充透明度，取值范围 [0,1] ，0表示完全透明，1表示不透明。默认为0.5
			strokeWeight: 3, // 轮廓线宽度
			strokeColor: '#409EFF', // 线条颜色，使用16进制颜色代码赋值。默认值为#00D3FC
			strokeOpacity: 1 // 轮廓线透明度，取值范围 [0,1] ，0表示完全透明，1表示不透明。默认为0.5
		}
		polyEditor._opt.editOptions = {
			// 编辑区域的样式
			fillColor: '#409EFF',
			fillOpacity: 0.3,
			strokeWeight: 3,
			strokeColor: '#409EFF',
			strokeOpacity: 1
		}
		polyEditor.on('add', async (e: any) => {
			const polygon = e.target
			nowPolygon.value = e.target
			const arr = await polygon.getPath()
			let pathArr: any[] = []
			for (const item of arr) {
				const data = [item.lng, item.lat]
				pathArr = [...pathArr, ...[data]]
			}
			pathData.value.push(pathArr)
			polyEditor.close()

			polygon.on('dblclick', (e: any) => {
				const path = e.target.getPath().map((item: any) => [item.lng, item.lat])
				const index = pathData.value.findIndex(
					item => item.join(',') === path.join(',')
				)
				edit.eid = index
				polyEditor.close()
				polyEditor.setTarget(e.target)
				polyEditor.open()
			})
		})
		polyEditor.on('end', async (e: any) => {
			const polygon = e.target
			let arr = await polygon.getPath().map((item: any) => [item.lng, item.lat])
			console.log(edit.eid, arr)
			if (edit.eid > -1) pathData.value[edit.eid] = arr
		})
	},
	createPolygon() {
		polyEditor.close()
		polyEditor.setTarget()
		polyEditor.open()
	},
	close() {
		polyEditor.close()
	},
	async handleSubmit() {
		const arr = await nowPolygon.value.getPath()
		console.log(arr)
	}
})

onUnmounted(() => {
	map?.destroy()
})
</script>

<style scoped land="less">
.map {
	width: 100%;
	height: 800px;
}
</style>
