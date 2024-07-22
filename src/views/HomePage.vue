<template>
	<div>
		<xl-form
			:formItem="form.formItem"
			:formData="form.formData"
			:rules="form.rules"
			@submit="form.handleSubmit"
		></xl-form>
		<!-- <xl-sharding-upload></xl-sharding-upload> -->
	</div>
</template>

<script setup lang="ts">
const state = reactive({
	loading: false,
	dataSource: [] as Array<any>,
	columns: [
		{
			title: '序号',
			dataIndex: 'idx',
			width: 100,
			align: 'center'
		},
		{
			title: '标题',
			dataIndex: 'title',
			width: 200
		},
		{
			title: '标题',
			dataIndex: 'title'
		}
	],
	pagination: { current: 1, pageSize: 10, total: 100 },
	handleChange: ({ current, pageSize }) => {
		state.pagination.current = current
		state.pagination.pageSize = pageSize
	},
	rowSelection: {}
})
onBeforeMount(() => {
	for (let i = 0; i < 10; i++) {
		state.dataSource.push({
			id: i + 1,
			title: '1111111',
			children: i === 1 ? [{ id: 111, title: '112233' }] : undefined
		})
	}
})

const form = reactive({
	formData: {
		a: undefined,
		b: undefined,
		c: [],
		d: undefined,
		e: undefined
	},
	formItem: [
		{
			label: '输入框',
			prop: 'a',
			type: 'input',
			formItemAttr: {},
			attribute: {}
		},
		{
			label: '树',
			prop: 'b',
			type: 'tree',
			formItemAttr: {},
			//api: '/index/index/getTreeCity',
			attribute: {
				options: [
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
					}
				]
			}
		},
		{
			label: '多选',
			prop: 'c',
			type: 'checkbox',
			api: '/index/system/index/code/3',
			formItemAttr: {},
			attribute: {}
		},
		{
			label: '单选',
			prop: 'd',
			type: 'radio',
			api: '/index/system/index/code/4',
			formItemAttr: {},
			attribute: {}
		},
		{
			label: '下拉',
			prop: 'e',
			type: 'select',
			//api: '/index/system/index/code/1',
			formItemAttr: {},
			attribute: {
				options: [
					{
						label: '1',
						value: '1'
					},
					{
						label: '2',
						value: '2'
					}
				]
			}
		},
		{
			label: '日期',
			prop: 'e',
			type: 'date',
			formItemAttr: {},
			attribute: {
				showTime: false
			}
		},
		{
			label: '开始结束时间',
			prop: 'f',
			type: 'range',
			formItemAttr: {},
			attribute: { showTime: false }
		},
		{
			label: '联级',
			prop: 'g',
			type: 'cascader',
			//api: '/index/index/getTreeCity',
			formItemAttr: {},
			attribute: {
				options: [
					{
						value: 'zhejiang',
						label: 'Zhejiang',
						isLeaf: false
					},
					{
						value: 'jiangsu',
						label: 'Jiangsu',
						isLeaf: false
					}
				]
			}
		}
	],
	formAttribute: {},
	rules: {
		a: [{ required: true, message: '请输入', trigger: 'blur' }]
	},
	handleSubmit(data) {
		console.log(data)
	}
})
</script>
