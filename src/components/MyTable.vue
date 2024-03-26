<template>
	<a-table v-bind="table"></a-table>
</template>

<script setup lang="ts" name="MyTable">
import type { ColumnType } from 'ant-design-vue'
type Key = string | number
const table = reactive({
	loading: false,
	rowKey: 'id',
	dataSource: [],
	columns: <ColumnType>[
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '年龄',
			dataIndex: 'age',
			key: 'age'
		},
		{
			title: '住址',
			dataIndex: 'address',
			key: 'address'
		}
	],
	pagination: {},
	rowSelection() {
		return {
			columnWidth: '80px',
			columnTitle: '选择',
			type: 'checkbox, radio',
			selectedRowKeys: [''],
			onChange: (selectedRowKeys: Key[], selectedRows: any[]) => {
				console.log(
					'selectedRowKeys: selectedRowKeys',
					'selectedRows: ',
					selectedRowKeys,
					selectedRows
				)
			},
			getCheckboxProps: (record: any) => ({
				props: {
					disabled: record.name === '',
					name: record.name
				}
			})
		}
	}
})

onMounted(() => {
	const dataArray = []
	for (let i = 1; i < 100; i++) {
		dataArray.push({
			id: i.toString(),
			name: '胡彦斌',
			age: (Math.random() * 10000).toFixed(0),
			address: '西湖区湖底公园1号'
		})
	}
	table.dataSource = dataArray
})
</script>
