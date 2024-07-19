<template>
	<div>
		<a-table
			ref="tableRef"
			:loading="state.loading"
			:columns="state.columns"
			:data-source="state.list"
			:row-key="record => record.id"
			:pagination="false"
			:scroll="{ y: state.itemHeight * state.end }"
			@change="state.handleTableChange"
			class="virtual"
		></a-table>
	</div>
</template>

<script setup name="TableVirtually">
const tableRef = ref()
const tableList = ref()
const state = reactive({
	loading: false,
	columns: [
		{ title: '编号', dataIndex: 'id', width: 150 },
		{ title: '姓名', dataIndex: 'buyerName', width: 120 },
		{ title: '性别', dataIndex: 'gender', width: 80 },
		{ title: '年龄', dataIndex: 'age', width: 80 },
		{ title: '电话号码', dataIndex: 'phone', width: 140 },
		{
			title: '住址',
			dataIndex: 'addressDetail',
			width: 240,
			ellipsis: true
		},
		{
			title: '所属驿站',
			dataIndex: 'stationName',
			width: 240,
			ellipsis: true
		}
	],
	initData: [], //所有数据
	itemHeight: 55, //每列高度
	screenHeight: 55 * 5, //可视区域高度
	startOffset: '', //偏移量
	start: 0, //起始索引
	end: 10, //结束索引
	list: computed(() => {
		return state.initData.slice(state.start, state.end)
	}),
	computedVisibleCount: computed(() => {
		return Math.ceil(state.screenHeight / state.itemHeight) + 1
	}),
	scrollEvent: ({ target }) => {
		//当前滚动位置
		let scrollTop = target.scrollTop
		//此时的开始索引
		state.start = Math.floor(scrollTop / state.itemHeight)
		//此时的结束索引
		state.end = state.start + 10
		//此时的偏移量
		/* state.startOffset = `translate3d(0,${
			scrollTop - (scrollTop % state.itemHeight)
		}px,0)` */
		//tableList.value.style.transform = state.startOffset
	}
})

onMounted(() => {
	for (let i = 0; i < 100; i++) {
		state.initData.push({
			id: i + 1,
			buyerName: 'JJJLin',
			addressDetail: '小区1测试单元3302室',
			gender: '女',
			age: 23,
			address: `福建省厦门市思明区筼筜街道仙岳路${Math.floor(Math.random() * 1000)}号翔业大厦`,
			visitTimeType: '8',
			stationName: '测试驿站'
		})
	}
	setTimeout(() => {
		const div = document.createElement('div')
		div.style = `height:${state.initData.length * state.itemHeight}px;position: absolute;z-index: 1;width:100%`
		div.className = 'virtual-scroll'
		const tabBody = document.querySelector('.ant-table-body')
		tabBody.style.height = `${state.screenHeight}px`
		tableList.value = document.querySelector('.ant-table-body table')
		tabBody.append(div)
		tabBody.addEventListener('scroll', e => {
			window.requestAnimationFrame(() => {
				state.scrollEvent(e)
			})
		})
	}, 1000)
})
</script>

<style lang="less" scoped>
.virtual {
	:deep(.ant-table) {
		height: 500px;
		.ant-table-body {
			position: relative;
		}
	}
}
</style>
