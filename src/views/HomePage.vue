<template>
	<div>
		<xl-sharding-upload></xl-sharding-upload>
		<!-- <xl-drawer v-model:value="visible"></xl-drawer>
		<a-button type="primary" @click="visible = true">111</a-button>
		<xl-base-form
			:formData="formData"
			:formItem="formItem"
			:rules="rules"
		></xl-base-form> -->

		<!-- <xl-table
			:columns="state.columns"
			api="/index/index/article"
			:filterData="handleFilterData"
		>
			<template #action="{ record }">
				<a-button type="primary" size="small" @click="state.handleEdit(record)"
					>编辑</a-button
				>
			</template>
		</xl-table> -->
	</div>
</template>

<script setup lang="ts">
//import XlBaseForm from '@/components/xl-form/index.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const visible = ref(false)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const treeData = [
	{
		label: 'root 1',
		value: 'root 1',
		children: [
			{
				label: 'parent 1',
				value: 'parent 1',
				children: [
					{
						label: 'parent 1-0',
						value: 'parent 1-0',
						children: [
							{
								label: 'my leaf',
								value: 'leaf1'
							},
							{
								label: 'your leaf',
								value: 'leaf2'
							}
						]
					},
					{
						label: 'parent 1-1',
						value: 'parent 1-1'
					}
				]
			},
			{
				label: 'parent 2',
				value: 'parent 2'
			}
		]
	}
]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const options = [
	{
		value: 'jack',
		label: 'Jack'
	},
	{
		value: 'lucy',
		label: 'Lucy'
	},
	{
		value: 'disabled',
		label: 'Disabled',
		disabled: true
	},
	{
		value: 'yiminghe',
		label: 'Yiminghe'
	}
]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const options1 = [
	{
		value: '1',
		label: 'Zhejiang',
		children: [
			{
				value: '1-1',
				label: 'Hangzhou',
				children: [
					{
						value: '1-1-1',
						label: 'West Lake'
					}
				]
			}
		]
	},
	{
		value: '1-2',
		label: 'Jiangsu',
		children: [
			{
				value: '1-2-1',
				label: 'Nanjing',
				children: [
					{
						value: '1-2-1-1',
						label: 'Zhong Hua Men'
					}
				]
			}
		]
	}
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const events = {
	change: (e: any, op: any) => {
		console.log(e, op)
	},
	search: (e: any) => {
		console.log(e)
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSearch = (data: any) => {
	console.log(data)
}
/* const blobToFile = (blob: any, fileName: string) => {
	const file = new File([blob], fileName, { type: blob.type })
	return file
} */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleFilterData = data => {
	return data.map(item => {
		item.status = '1'
		return item
	})
}
const state = reactive({
	columns: [
		{
			title: '拜访信息',
			dataIndex: 'title',
			width: 200,
			ellipsis: true
		},
		{
			title: '姓名',
			dataIndex: 'buyerName',
			width: 200,
			ellipsis: true
		},
		{
			title: '性别',
			dataIndex: 'gender',
			width: 200
		},
		{
			title: '年龄',
			dataIndex: 'age',
			width: 200
		},
		{
			title: '电话号码',
			dataIndex: 'phone',
			width: 200
		},
		{
			title: '住家地址',
			dataIndex: 'addressDetail',
			width: 200,
			ellipsis: true
		},
		{
			title: '所属驿站',
			dataIndex: 'stationName',
			width: 200
		},
		{
			title: '客户标签',
			dataIndex: 'tagNameList',
			width: 200
		},
		{
			title: 'APP账号',
			dataIndex: 'appAccount',
			width: 200,
			link: { name: 'HomeDetail', params: 'id' }
		},
		{
			title: '创建来源',
			dataIndex: 'openType',
			width: 200
		},
		{
			title: '状态',
			dataIndex: 'statusLabel',
			width: 200
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
			width: 200
		},
		{
			title: '操作',
			dataIndex: 'updateTime',
			width: 120,
			slotName: 'action',
			align: 'center',
			fixed: 'right'
		}
	],
	dataSource: [
		{
			buyerName: '新苗',
			phone: '',
			cardNo: '123123',
			addressDetail: '测试小区测试楼栋0801室',
			provinceName: '福建省',
			cityName: '厦门市',
			districtName: '思明区',
			id: '8809495897155411968',
			institutionId: '1767016243028152321',
			stationId: '1808701740804472834',
			gender: '男',
			nativePlace: '',
			appellation: '',
			appAccount: '18144126339',
			cardType: '5',
			age: 2,
			photoUrl:
				'https://fs.leelen.com/home/data/nas/saas/pubpic/buyer_pic_default.png',
			provinceCode: 350000,
			cityCode: 350200,
			districtCode: 350203,
			address: '福建省厦门市思明区筼筜街道仙岳路414号特运松柏小区',
			neighId: '1808703223365107713',
			neighName: '测试小区',
			emergentName: '',
			emergentPhone: '',
			status: '3',
			openType: '平台创建',
			houseId: '',
			height: '',
			weight: '',
			disabilitySituation: '',
			residenceSituation: '',
			longitude: '118.11408',
			latitude: '24.492819',
			joinTime: '2024-07-04 11:27:56',
			buyerTag: '0',
			remark: '',
			officeName: '',
			canApplyLock: '2',
			focusOn: '0',
			politicalStatus: '',
			visitTimeTypeName: '从未拜访',
			visitTimeType: '8',
			latestVisitTime: null,
			creatorId: '1760488494461456385',
			updaterId: '1760488494461456385',
			createTime: '2024-07-04 11:27:56',
			updateTime: '2024-07-04 11:28:47',
			stationName: 'M驿站',
			tagNameList: '群众,伤残',
			statusLabel: '已授权'
		},
		{
			buyerName: '小汪',
			phone: '',
			cardNo: '350212199507030012',
			addressDetail: '测试小区锦华金都149栋0901室',
			provinceName: '福建省',
			cityName: '厦门市',
			districtName: '思明区',
			id: '8807125384445665280',
			institutionId: '1767016243028152321',
			stationId: '1808414371991781377',
			gender: '男',
			nativePlace: '',
			appellation: '',
			appAccount: '18144126339',
			cardType: '1',
			age: 29,
			photoUrl:
				'https://fs.leelen.com/home/data/nas/saas/pubpic/buyer_pic_default.png',
			provinceCode: 350000,
			cityCode: 350200,
			districtCode: 350203,
			address: '福建省厦门市思明区筼筜街道宜和女子学院莲滨里',
			neighId: '1808414553852608514',
			neighName: '测试小区',
			emergentName: '',
			emergentPhone: '',
			status: '3',
			openType: '平台创建',
			houseId: '',
			height: '',
			weight: '',
			disabilitySituation: '',
			residenceSituation: '',
			longitude: '118.116614',
			latitude: '24.487818',
			joinTime: '2024-07-03 16:18:04',
			buyerTag: '0',
			remark: '',
			officeName: '',
			canApplyLock: '2',
			focusOn: '0',
			politicalStatus: '',
			visitTimeTypeName: '从未拜访',
			visitTimeType: '8',
			latestVisitTime: null,
			creatorId: '1761926533872214018',
			updaterId: '1761926533872214018',
			createTime: '2024-07-03 16:18:04',
			updateTime: '2024-07-03 16:18:04',
			stationName: '关怀性能',
			tagNameList: '伤残',
			statusLabel: '已授权'
		},
		{
			buyerName: '测试专用测试专用测试专用测试专用测试专用',
			phone: '',
			cardNo: '123123',
			addressDetail: '测试小区小区下片区片区下楼栋0901室',
			provinceName: '福建省',
			cityName: '厦门市',
			districtName: '思明区',
			id: '8803854234273808384',
			institutionId: '1767016243028152321',
			stationId: '1805906687526711297',
			gender: '男',
			nativePlace: '',
			appellation: '',
			appAccount: '18144126339',
			cardType: '5',
			age: 2,
			photoUrl:
				'https://fs.leelen.com/home/data/nas/saas/pubpic/buyer_pic_default.png',
			provinceCode: 350000,
			cityCode: 350200,
			districtCode: 350203,
			address: '福建省厦门市思明区筼筜街道育秀中路育秀厦工宿舍',
			neighId: '1806131871579910146',
			neighName: '测试小区',
			emergentName: '',
			emergentPhone: '',
			status: '3',
			openType: '平台创建',
			houseId: '',
			height: '',
			weight: '',
			disabilitySituation: '',
			residenceSituation: '',
			longitude: '118.112967',
			latitude: '24.487545',
			joinTime: '2024-07-02 13:51:21',
			buyerTag: '0',
			remark: '',
			officeName: '',
			canApplyLock: '2',
			focusOn: '0',
			politicalStatus: '',
			visitTimeTypeName: '从未拜访',
			visitTimeType: '8',
			latestVisitTime: null,
			creatorId: '1761926533872214018',
			updaterId: '1761926533872214018',
			createTime: '2024-07-02 13:51:21',
			updateTime: '2024-07-02 13:51:21',
			stationName: '船新的驿站',
			tagNameList: '群众',
			statusLabel: '已授权'
		},
		{
			buyerName: '误入',
			phone: '',
			cardNo: '2024070100002',
			addressDetail: '测试小区小区下片区片区下楼栋0901室',
			provinceName: '福建省',
			cityName: '厦门市',
			districtName: '思明区',
			id: '8800356997023481856',
			institutionId: '1767016243028152321',
			stationId: '1805906687526711297',
			gender: '男',
			nativePlace: '',
			appellation: '',
			appAccount: '18859702193',
			cardType: '3',
			age: 58,
			photoUrl:
				'https://saas-test84.leelen.net/home/data/nas/saas/0/1/2024-07-01/a1a56e04-ded8-43e3-b718-e105d95c0708.jpg',
			provinceCode: 350000,
			cityCode: 350200,
			districtCode: 350203,
			address: '福建省厦门市思明区筼筜街道育秀中路育秀厦工宿舍',
			neighId: '1806131871579910146',
			neighName: '测试小区',
			emergentName: '',
			emergentPhone: '',
			status: '4',
			openType: '二维码申请',
			houseId: '',
			height: '',
			weight: '',
			disabilitySituation: '',
			residenceSituation: '',
			longitude: '118.112967',
			latitude: '24.487545',
			joinTime: null,
			buyerTag: '0',
			remark: '',
			officeName: '',
			canApplyLock: '2',
			focusOn: '0',
			politicalStatus: '',
			visitTimeTypeName: '从未拜访',
			visitTimeType: '8',
			latestVisitTime: null,
			creatorId: 0,
			updaterId: '1760845790458798082',
			createTime: '2024-07-01 09:34:59',
			updateTime: '2024-07-02 15:59:19',
			stationName: '船新的驿站',
			tagNameList: '群众',
			statusLabel: '审核失败'
		},
		{
			buyerName: 'aha',
			phone: '',
			cardNo: '202407010001',
			addressDetail:
				'0613小区名称很长啊哈哈哈啊哈哈哈啊哈这是片区这是片区这是这是楼栋这是楼栋这是这是单元这是单元这是0923室',
			provinceName: '福建省',
			cityName: '厦门市',
			districtName: '思明区',
			id: '8800341019745140736',
			institutionId: '1767016243028152321',
			stationId: '1767016558615973889',
			gender: '男',
			nativePlace: '',
			appellation: '',
			appAccount: '14420240701',
			cardType: '3',
			age: 52,
			photoUrl:
				'https://saas-test84.leelen.net/home/data/nas/saas/0/1/2024-07-01/2b5b65dc-9f74-446e-ada1-b7ec965a7604.jpg',
			provinceCode: 350000,
			cityCode: 350200,
			districtCode: 350203,
			address: '福建省厦门市思明区筼筜街道莲岳里229号厦门NOA诺亚酒店',
			neighId: '1801196098841837569',
			neighName: '0613小区名称很长啊哈哈哈啊哈哈哈啊哈',
			emergentName: '',
			emergentPhone: '',
			status: '4',
			openType: '二维码申请',
			houseId: '',
			height: '',
			weight: '',
			disabilitySituation: '',
			residenceSituation: '',
			longitude: '118.112881',
			latitude: '24.49231',
			joinTime: null,
			buyerTag: '0',
			remark: '',
			officeName: '',
			canApplyLock: '2',
			focusOn: '0',
			politicalStatus: '',
			visitTimeTypeName: '从未拜访',
			visitTimeType: '8',
			latestVisitTime: null,
			creatorId: 0,
			updaterId: '1760845790458798082',
			createTime: '2024-07-01 09:27:14',
			updateTime: '2024-07-02 15:56:25',
			stationName: '小苏驿站',
			tagNameList: '群众',
			statusLabel: '审核失败'
		},
		{
			buyerName: 'app测试客户',
			phone: '',
			cardNo: 'dfsfds3121',
			addressDetail: '小区片区1楼栋A2102室',
			provinceName: '福建省',
			cityName: '厦门市',
			districtName: '思明区',
			id: '8794303841915191296',
			institutionId: '1767016243028152321',
			stationId: '1767370866674974721',
			gender: '男',
			nativePlace: '',
			appellation: '',
			appAccount: '15160063310',
			cardType: '4',
			age: 21,
			photoUrl:
				'https://fs.leelen.com/home/data/nas/saas/pubpic/buyer_pic_default.png',
			provinceCode: 350000,
			cityCode: 350200,
			districtCode: 350203,
			address: '福建省厦门市思明区筼筜街道仙岳路188号福达里',
			neighId: '1770632410246512642',
			neighName: '小区',
			emergentName: '',
			emergentPhone: '',
			status: '3',
			openType: '平台创建',
			houseId: '',
			height: '',
			weight: '',
			disabilitySituation: '',
			residenceSituation: '',
			longitude: '118.094856',
			latitude: '24.488834',
			joinTime: '2024-06-29 08:38:48',
			buyerTag: '0',
			remark: '',
			officeName: '',
			canApplyLock: '2',
			focusOn: '0',
			politicalStatus: '',
			visitTimeTypeName: '1周内拜访',
			visitTimeType: '2',
			latestVisitTime: '2024-06-29 08:39:00',
			creatorId: '1760491839041409026',
			updaterId: '1760491839041409026',
			createTime: '2024-06-29 08:38:48',
			updateTime: '2024-06-29 08:38:48',
			stationName: '小苏驿站02',
			tagNameList: '大病人群',
			statusLabel: '已授权'
		},
		{
			buyerName: '小林',
			phone: '',
			cardNo: '350623200005254514',
			addressDetail: '锦华金都A片区01号楼1117室',
			provinceName: '福建省',
			cityName: '厦门市',
			districtName: '思明区',
			id: '8792176596153081856',
			institutionId: '1767016243028152321',
			stationId: '1767016558615973889',
			gender: '女',
			nativePlace: '',
			appellation: '',
			appAccount: '18859659712',
			cardType: '1',
			age: 24,
			photoUrl:
				'https://saas-test84.leelen.net/home/data/nas/saas/0/1/2024-06-28/77cae3c0-9e37-4a73-8d45-bc87afc81cc2.jpg',
			provinceCode: 350000,
			cityCode: 350200,
			districtCode: 350203,
			address: '福建省厦门市思明区筼筜街道厦门博物馆博物馆',
			neighId: '1786581308102213634',
			neighName: '锦华金都',
			emergentName: '',
			emergentPhone: '',
			status: '3',
			openType: '二维码申请',
			houseId: '',
			height: '',
			weight: '',
			disabilitySituation: '',
			residenceSituation: '',
			longitude: '118.109209',
			latitude: '24.49097',
			joinTime: '2024-06-28 15:52:30',
			buyerTag: '0',
			remark: '',
			officeName: '',
			canApplyLock: '2',
			focusOn: '0',
			politicalStatus: '',
			visitTimeTypeName: '从未拜访',
			visitTimeType: '8',
			latestVisitTime: null,
			creatorId: 0,
			updaterId: 0,
			createTime: '2024-06-28 15:26:59',
			updateTime: '2024-07-03 16:35:38',
			stationName: '小苏驿站',
			tagNameList: '空巢老人',
			statusLabel: '已授权'
		},
		{
			buyerName: '家庭排序',
			phone: '',
			cardNo: '202406280001',
			addressDetail: '这是小区名称名称花花片区顺风花花楼栋花花单元9899室',
			provinceName: '福建省',
			cityName: '厦门市',
			districtName: '集美区',
			id: '8792127461727215616',
			institutionId: '1767016243028152321',
			stationId: '1767016558615973889',
			gender: '女',
			nativePlace: '',
			appellation: '',
			appAccount: '18859702193',
			cardType: '3',
			age: 45,
			photoUrl:
				'https://saas-test84.leelen.net/authpic?p=https://fs.leelen.com/home/data/nas/saas/pubpic/buyer_pic_default.png',
			provinceCode: 350000,
			cityCode: 350200,
			districtCode: 350211,
			address: '福建省厦门市集美区铁山路781号',
			neighId: '1777260884830830594',
			neighName: '这是小区名称名称',
			emergentName: '',
			emergentPhone: '',
			status: '3',
			openType: '平台创建',
			houseId: '',
			height: '',
			weight: '',
			disabilitySituation: '',
			residenceSituation: '',
			longitude: '118.00416',
			latitude: '24.597691',
			joinTime: '2024-06-28 15:03:07',
			buyerTag: '0',
			remark: '',
			officeName: '',
			canApplyLock: '2',
			focusOn: '0',
			politicalStatus: '',
			visitTimeTypeName: '从未拜访',
			visitTimeType: '8',
			latestVisitTime: null,
			creatorId: '1760845790458798082',
			updaterId: '1760845790458798082',
			createTime: '2024-06-28 15:03:07',
			updateTime: '2024-07-03 08:56:08',
			stationName: '小苏驿站',
			tagNameList: '群众,伤残,低保人群',
			statusLabel: '已授权'
		},
		{
			buyerName: '小汪小汪小汪小汪小汪小汪小汪小汪小汪小汪',
			phone: '',
			cardNo: '350212199507030012',
			addressDetail: '测试小区小区下片区片区下楼栋0901室',
			provinceName: '福建省',
			cityName: '厦门市',
			districtName: '思明区',
			id: '8788426746106249216',
			institutionId: '1767016243028152321',
			stationId: '1805906687526711297',
			gender: '男',
			nativePlace: '',
			appellation: '',
			appAccount: '18144126339',
			cardType: '1',
			age: 29,
			photoUrl:
				'https://saas-test84.leelen.net/authpic?p=https://fs.leelen.com/home/data/nas/saas/pubpic/buyer_pic_default.png',
			provinceCode: 350000,
			cityCode: 350200,
			districtCode: 350203,
			address: '福建省厦门市思明区筼筜街道育秀中路育秀厦工宿舍',
			neighId: '1806131871579910146',
			neighName: '测试小区',
			emergentName: '',
			emergentPhone: '',
			status: '3',
			openType: '平台创建',
			houseId: '',
			height: '',
			weight: '',
			disabilitySituation: '',
			residenceSituation: '',
			longitude: '118.112967',
			latitude: '24.487545',
			joinTime: '2024-06-27 09:08:03',
			buyerTag: '0',
			remark: '',
			officeName: '',
			canApplyLock: '2',
			focusOn: '0',
			politicalStatus: '',
			visitTimeTypeName: '从未拜访',
			visitTimeType: '8',
			latestVisitTime: null,
			creatorId: '1761926533872214018',
			updaterId: 0,
			createTime: '2024-06-27 09:08:03',
			updateTime: '2024-07-03 01:00:01',
			stationName: '船新的驿站',
			tagNameList: '伤残',
			statusLabel: '已授权'
		},
		{
			buyerName: '吴语',
			phone: '',
			cardNo: '202406260001',
			addressDetail:
				'小苏驿站04小区这是片区这是片区这是这是楼栋这是楼栋这是这是单元这是单元这是0923室',
			provinceName: '福建省',
			cityName: '厦门市',
			districtName: '思明区',
			id: '8785707172814356482',
			institutionId: '1767016243028152321',
			stationId: '1805798805938483201',
			gender: '男',
			nativePlace: '',
			appellation: '',
			appAccount: '18859702193',
			cardType: '3',
			age: 45,
			photoUrl:
				'https://fs.leelen.com/home/data/nas/saas/pubpic/buyer_pic_default.png',
			provinceCode: 350000,
			cityCode: 350200,
			districtCode: 350203,
			address: '福建省厦门市思明区筼筜街道屿后南路夏商(屿后南路店)',
			neighId: '1805799681084207106',
			neighName: '小苏驿站04小区',
			emergentName: '',
			emergentPhone: '',
			status: '3',
			openType: '平台创建',
			houseId: '',
			height: '',
			weight: '',
			disabilitySituation: '',
			residenceSituation: '',
			longitude: '118.12288',
			latitude: '24.492778',
			joinTime: '2024-06-26 11:08:53',
			buyerTag: '0',
			remark: '',
			officeName: '',
			canApplyLock: '2',
			focusOn: '0',
			politicalStatus: '',
			visitTimeTypeName: '从未拜访',
			visitTimeType: '8',
			latestVisitTime: null,
			creatorId: '1760845790458798082',
			updaterId: '1760845790458798082',
			createTime: '2024-06-26 11:08:53',
			updateTime: '2024-06-26 11:08:53',
			stationName: '小苏驿站04',
			tagNameList: '群众',
			statusLabel: '已授权'
		}
	],
	handleEdit({ id }) {
		console.log(id)
	},
	pagination: {
		current: 1,
		pageSize: 10,
		total: 100,
		showQuickJumper: true,
		showLessItems: false,
		showSizeChanger: true
	},
	loading: false,
	handleChange({ current, pageSize, total }) {
		state.loading = true
		state.pagination = { ...state.pagination, current, pageSize, total }
		setTimeout(() => {
			state.loading = false
		}, 3000)
	}
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formData = {
	a: undefined,
	b: undefined,
	c: '1',
	d: ['3'],
	e: undefined
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rules = {
	a: [{ required: true, message: '请输入', trigger: 'blur' }],
	b: [{ required: true, message: '请选择', trigger: 'blur' }]
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formItem = [
	{
		label: '输入框',
		prop: 'a',
		attribute: {},
		events: {}
	},
	{
		label: '下拉框',
		prop: 'b',
		type: 'select',
		attribute: {
			options: [
				{
					label: 'Online',
					value: '1'
				},
				{
					label: 'Online2',
					value: '2'
				}
			]
		},
		events: {}
	},
	{
		label: '单选',
		prop: 'c',
		type: 'radio',
		attribute: { api: '/index/system/index/code/4' }
	},
	{
		label: '多选',
		prop: 'd',
		type: 'checkbox',
		attribute: { api: '/index/system/index/code/3' }
	},
	{
		label: '创建日期',
		prop: 'e',
		type: 'date',
		attribute: { showTime: false }
	},
	{
		label: '下单日期',
		prop: 'f',
		type: 'range',
		attribute: {}
	},
	{
		label: '地区',
		prop: 'j',
		type: 'cascader',
		attribute: { api: '/index/index/getTreeCity' }
	}
]

onMounted(() => {})
</script>

<style lang="less" scoped></style>
