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
	formData: {},
	formItem: [
		{
			label: '输入框',
			prop: 'a',
			type: 'input',
			span: 24,
			formItemAttr: {},
			attribute: {}
		},
		{
			label: '树',
			prop: 'b',
			type: 'tree',
			span: 24,
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
