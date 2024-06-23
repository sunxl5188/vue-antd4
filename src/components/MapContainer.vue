<template>
	<div>
		{{ pathData }}
		<div>
			<a-space>
				<a-button type="primary" @click="edit.createPolygon">新建</a-button>
				<a-button v-if="edit.isEdit" @click="edit.close()">结束编辑</a-button>
				<a-button @click="edit.handleSubmit">保存</a-button>
			</a-space>
		</div>
		<div id="container" class="map"></div>
	</div>
</template>

<script setup lang="ts" name="MapContainer">
import { ModalKey } from '@/utils/injectKey'
import AMapLoader from '@amap/amap-jsapi-loader'
let map: any = null
let aMap: any = null
let polyEditor: any = null

const modal = inject(ModalKey)

const paths = [
	[
		[116.471558, 39.996394],
		[116.46967, 39.993336],
		[116.474626, 39.992087],
		[116.474648, 39.994915]
	],
	[
		[116.467765, 39.992001],
		[116.466843, 39.988861],
		[116.471778, 39.986937],
		[116.473323, 39.988877],
		[116.471285, 39.990899],
		[116.469525, 39.989074]
	]
]

const pathData = ref<any[]>([])

onMounted(() => {
	;(window as any)['_AMapSecurityConfig'] = {
		securityJsCode: 'ec92c3d8d63147f4e348635a516e16a6'
	}
	AMapLoader.load({
		key: '7f96a737195a244dbf7d783ecbe8a6ef', // 申请好的Web端开发者Key，首次调用 load 时必填
		version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: ['AMap.Scale', 'AMap.PolygonEditor', 'AMap.ContextMenu'] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
	})
		.then(AMap => {
			aMap = AMap
			map = new AMap.Map('container', {
				// 设置地图容器id
				viewMode: '3D', // 是否为3D地图模式
				zoom: 16, // 初始化地图级别
				center: [116.471354, 39.994257] // 初始化地图中心点位置
			})
			polyEditor = new AMap.PolygonEditor(map)
			edit.mapConfig(AMap)
		})
		.catch(e => {
			console.log(e)
		})
})

const edit = reactive({
	isEdit: false,
	polygonList: [] as any[],
	mapConfig(AMap: any) {
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
		if (paths.length) {
			for (const path of paths) {
				edit.polygonList.push(new AMap.Polygon({ path }))
			}
			map.add(edit.polygonList)
			map.setFitView()
			polyEditor.addAdsorbPolygons(edit.polygonList)
		}
		//新增多边形
		polyEditor.on('add', async (e: any) => {
			const polygon = e.target
			edit.isEdit = true
			polyEditor.addAdsorbPolygons(polygon)
			polygon.on('dblclick', () => {
				edit.isEdit = true
				polyEditor.close()
				polyEditor.setTarget(polygon)
				polyEditor.open()
			})
			polygon.on('rightclick', (e: any) => {
				edit.handleContextMenu(AMap, polygon, e.lnglat)
			})
		})
		// 编辑已有数据
		edit.polygonList.forEach(polygon => {
			polygon.on('dblclick', () => {
				edit.isEdit = true
				polyEditor.close()
				polyEditor.setTarget(polygon)
				polyEditor.open()
			})
			polygon.on('rightclick', (e: any) => {
				edit.handleContextMenu(AMap, polygon, e.lnglat)
			})
		})
	},
	createPolygon() {
		polyEditor.close()
		polyEditor.setTarget()
		polyEditor.open()
	},
	close() {
		polyEditor.close()
		edit.isEdit = false
	},
	getPathArr(data: any[]) {
		const pathArr: any[] = []
		data.forEach(item => {
			pathArr.push([item.lng, item.lat])
		})
		return pathArr
	},
	async handleSubmit() {
		const overlays = map.getAllOverlays()
		const pathArr = []
		for (const polygon of overlays) {
			const arr = await polygon.getPath()
			pathArr.push(edit.getPathArr(arr))
		}
		pathData.value = pathArr
		let boole = false
		for (const item of pathData.value) {
			for (const iter of pathData.value) {
				if (item.join('') !== iter.join('')) {
					boole = aMap.GeometryUtil.doesLineRingIntersect(iter, item)
					if (boole) break
				}
			}
			if (boole) break
		}
		if (boole) modal?.error('绘制的图形不能有交叉')
	},
	handleContextMenu(AMap: any, polygon: any, lnglat: any) {
		const menu = new AMap.ContextMenu()
		menu.addItem('删除', () => {
			edit.handleRemovePolygon(polygon)
			menu.close()
		})
		menu.open(map, lnglat)
	},
	handleRemovePolygon(polygon: any) {
		polyEditor.close()
		map.remove(polygon)
		edit.isEdit = false
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
