<template>
	<a-table
		:loading="loading || state.loading"
		:columns="columns"
		:data-source="!dataSource.length ? state.dataSource : dataSource"
		:pagination="pagination || state.pagination"
		v-bind="attribute"
		v-on="onEvents"
	>
		<template #bodyCell="{ text, record, index, column }">
			<!-- 单元格自动省略 -->
			<template v-if="column.ellipsis">
				<a-tooltip :title="state.tooltipDisabled ? text : ''">
					<div
						class="truncate"
						:class="{ 'text-gray-400': !text }"
						@mouseenter="state.isBeyond"
					>
						{{ text || '--' }}
					</div>
				</a-tooltip>
			</template>
			<!-- 跳转连接 -->
			<template v-if="column.link">
				<span v-if="!text" class="text-gray-400">--</span>
				<router-link
					v-else-if="typeof column.link === 'string'"
					:to="column.link"
				>
					{{ text }}
				</router-link>
				<router-link
					v-else-if="column.link.query"
					:to="{
						path: column.link?.path,
						query: { [column.link.query]: record[column.link.query] }
					}"
					:target="column.link?.target || '_self'"
				>
					{{ text }}
				</router-link>
				<router-link
					v-else-if="column.link.params"
					:to="{
						name: column.link?.name,
						params: { [column.link.params]: record[column.link.params] }
					}"
					:target="column.link?.target || '_self'"
				>
					{{ text }}
				</router-link>
			</template>
			<!-- 自定义插槽 -->
			<template v-if="column.slotName">
				<slot
					:name="column.slotName"
					:text="text"
					:record="record"
					:index="index"
					:column="column"
				></slot>
			</template>
		</template>
	</a-table>
</template>

<script setup lang="ts" name="TableComponent">
import type { TableProps, TableColumnType } from 'ant-design-vue'
import { request } from '@/utils/request'

interface PropsType {
	loading?: boolean
	columns: TableColumnType[]
	api?: string
	rowSelection?: TableProps['rowSelection']
	dataSource?: Array<any>
	pagination?: any
	filterData?: (data: Array<any>) => void
}
const props = withDefaults(defineProps<PropsType>(), {
	loading: false,
	columns() {
		return []
	},
	api: undefined,
	rowSelection: (): any => {},
	dataSource: () => [],
	pagination: () => {},
	filterData: undefined
})

const emit = defineEmits(['change'])

const PAGINATION = {
	current: 1,
	pageSize: 10,
	total: 0,
	showQuickJumper: true,
	showLessItems: false,
	showSizeChanger: true
}
const state = reactive({
	loading: false,
	dataSource: [],
	pagination: { ...PAGINATION },
	selectedRowKeys: [] as string[],
	selectedRows: [] as any[],
	rowSelection: {
		type: 'checkbox',
		onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
			state.selectedRowKeys = selectedRowKeys
			state.selectedRows = selectedRows
		},
		// getCheckboxProps: (record: any) => ({
		// 	disabled: record.name === '', // 判断是否满足条件
		// 	name: record.name
		// }),
		...props.rowSelection
	} as TableProps['rowSelection'],
	async handleTableChange(pagination = {} as any): Promise<any> {
		if (props.api) {
			state.loading = true
			const current = pagination.current || PAGINATION.current
			const pageSize = pagination.pageSize || PAGINATION.pageSize
			const { code, data } = await request({
				url: props.api,
				method: 'post',
				data: { current, pageSize }
			})
			if (code === 200 && data) {
				const { current, pageSize, total, list } = data
				state.pagination = { ...state.pagination, current, pageSize, total }
				state.dataSource =
					Object.prototype.toString.call(props.filterData) ===
					'[object Function]'
						? props.filterData!(list)
						: list
			}
			state.loading = false
		} else emit('change', pagination)
	},
	//判断文本是否益出~文本必须是单行
	tooltipDisabled: false,
	isBeyond(e: any) {
		const ev = window.event || e
		const textContent = ev.target
		const clientW = textContent.clientWidth
		const scrollW = textContent.scrollWidth
		state.tooltipDisabled = scrollW > clientW
	}
})

const attribute = {
	tableLayout: 'fixed',
	rowKey: 'id',
	scroll: { x: 1000, scrollToFirstRowOnChange: true },
	rowSelection: props.rowSelection ? state.rowSelection : null
}
const onEvents = {
	change: state.handleTableChange
}

onBeforeMount(() => {
	if (props.api) {
		state.handleTableChange()
	}
})
</script>
