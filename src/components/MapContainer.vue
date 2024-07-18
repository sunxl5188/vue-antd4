<template>
	<div>
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

onMounted(async () => {
	;(window as any)['_AMapSecurityConfig'] = {
		securityJsCode: 'ec92c3d8d63147f4e348635a516e16a6'
	}
	const AMap = await AMapLoader.load({
		key: '7f96a737195a244dbf7d783ecbe8a6ef', // 申请好的Web端开发者Key，首次调用 load 时必填
		version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: [
			'AMap.Scale',
			'AMap.PolygonEditor',
			'AMap.ContextMenu',
			'AMap.Geocoder'
		] //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
	})
	aMap = AMap
	map = new AMap.Map('container', {
		resizeEnable: true, // 窗口大小调整
		// 设置地图容器id
		viewMode: '3D', // 是否为3D地图模式
		zoom: 16, // 初始化地图级别
		isHotspot: true, // 是否开启地图热点和标注的 hover 效果
		mapStyle: 'amap://styles/dark', //设置地图的显示样式
		center: [116.471354, 39.994257] // 初始化地图中心点位置
	})
	//绘制多边形
	polyEditor = new AMap.PolygonEditor(map)
	edit.mapConfig(AMap)
	//创建点标记
	mark.create()
})
//创建点标记
const mark = reactive({
	marker: null as any,
	//实例化点标记
	create() {
		mark.marker = new aMap.Marker({
			icon: new aMap.Icon({
				image:
					'//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
				imageSize: new aMap.Size(25, 34),
				size: new aMap.Size(25, 34)
			}),
			anchor: 'center',
			offset: new aMap.Pixel(-13, -30)
		})
		mark.marker.setMap(map)
		mark.marker.hide()
		map.on('click', mark.handleAddMarker)
	},
	async handleAddMarker(e: any) {
		const lnglat = [e.lnglat.getLng(), e.lnglat.getLat()]
		const content = await regeoToAddress(lnglat)
		mark.marker.setLabel({
			content,
			direction: 'center',
			offset: new aMap.Pixel(0, 35)
		})
		mark.marker.setPosition(lnglat)
		mark.marker.show()
	},
	//清除 marker
	clearMarker() {
		if (mark.marker) {
			mark.marker.setMap(null)
			mark.marker = null
		}
	}
})
//地图热点
/* const hot = reactive({
	create() {}
}) */
//绘制距形图
const edit = reactive({
	isEdit: false,
	pathData: [] as Array<any[]>,
	polygonList: [] as any[],
	mapConfig(AMap: any) {
		edit.pathData = []
		edit.polygonList = []
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
		const pathArr: Array<any> = []
		for (const polygon of overlays) {
			const arr = await polygon.getPath()
			pathArr.push(edit.getPathArr(arr))
		}
		edit.pathData = pathArr
		let boole = false
		for (const item of edit.pathData) {
			for (const iter of edit.pathData) {
				if (item.join('') !== iter.join('')) {
					boole = aMap.GeometryUtil.doesLineRingIntersect(iter, item)
					if (boole) break
				}
			}
			if (boole) break
		}
		if (boole) {
			modal?.error('绘制的图形不能有交叉')
			return false
		}
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

//经纬度转地址
let geocoder: any
const regeoToAddress = (lnglat: string[]) => {
	return new Promise((resolve, reject) => {
		if (!geocoder) geocoder = new aMap.Geocoder()
		if (geocoder) {
			geocoder.getAddress(lnglat, function (status: string, result: any) {
				if (status === 'complete' && result.regeocode) {
					resolve(result.regeocode.formattedAddress)
				} else {
					reject('根据经纬度查询地址失败')
				}
			})
		}
	})
}

//绘制弹窗
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* const showInfoWindow = async (data: any[], e: any) => {
	const lnglat = e.lnglat
	const address = await regeoToAddress(lnglat)
	let infoWindow
	let info: Array<any> = []
	info.push(
		`<div class="header"><span class="title">${address}</span><span class="close"></span></div>`
	)
	info.push('<ul>')
	for (const item of data) {
		info.push(`<li> ${item.label}：${item.value}</li>`)
	}
	info.push('</ul>')
	// 创建浮窗
	infoWindow = new aMap.InfoWindow({
		isCustom: true,
		offset: new aMap.Pixel(26, -15), // 偏移量
		content: info.join('') // 使用默认信息窗体框样式，显示信息内容
	})
	infoWindow.open(map, e.lnglat) // 打开弹窗
	const el = document.querySelector('.close')
	el?.addEventListener('click', () => {
		map.clearInfoWindow()
		el.remove()
	})
} */

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
<style lang="less">
.amap-layers {
	* {
		box-sizing: border-box;
	}
	ul,
	li {
		list-style: none;
	}
	.amap-marker-label {
		background: rgba(0, 0, 0, 0.7);
		color: #fff;
		border-color: #000;
		border-radius: 5px;
		font-size: 14px;
		padding: 8px 12px;
	}
	.amap-info-contentContainer {
		background: #fff;
		border-radius: 5px;
		min-width: 260px;
		max-width: 350px;
		.header {
			width: 100%;
			border-bottom: 1px solid #dedede;
			padding: 10px 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.title {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				line-height: 30px;
				font-weight: 600;
				flex: 1;
			}
			.close {
				width: 30px;
				height: 30px;
				display: inline-block;
				cursor: pointer;
				&::before {
					content: 'x';
					font-size: 16px;
					text-align: center;
					width: 30px;
					height: 30px;
					line-height: 30px;
					display: inline-block;
					color: #888;
				}
				&:hover {
					&::before {
						color: #333;
					}
				}
			}
		}
		ul {
			padding: 15px;
			li {
				height: 26px;
				line-height: 26px;
				font-size: 15px;
			}
		}
	}
}
</style>
