<template>
	<a-table
		:loading="loading"
		:columns="columns"
		:data-source="dataSource"
		:pagination="{ ...PAGINATION, ...pagination }"
		v-bind="attribute"
		v-on="event"
	>
		<template #bodyCell="{ text, record, index, column }">
			<!-- 序号 -->
			<template v-if="column.dataIndex === 'idx'">
				{{ state.indexMethod(index) }}
			</template>
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
		<template
			v-if="expanded"
			#expandedRowRender="{ record, index, indent, expanded }"
		>
			<slot
				name="expandedRowRender"
				:record="record"
				:index="index"
				:indent="indent"
				:expanded="'expanded'"
			></slot>
		</template>
	</a-table>
</template>

<script setup lang="ts" name="TableComponent">
import type { TableColumnType } from 'ant-design-vue'

interface PropsType {
	loading: boolean
	columns: TableColumnType[]
	dataSource: Array<any>
	pagination: any
	attr?: any
	event?: any
	expanded?: boolean
}
const props = withDefaults(defineProps<PropsType>(), {
	loading: false,
	columns() {
		return []
	},
	dataSource: () => [],
	pagination: () => {},
	attr: () => {},
	event: () => {
		return {}
	},
	expanded: false
})
const PAGINATION = {
	current: 1,
	pageSize: 10,
	total: 0,
	pageSizeOptions: ['5', '10', '15', '20', '25', '30', '50'],
	showQuickJumper: true,
	showLessItems: false,
	showSizeChanger: true
}
const state = reactive({
	//判断文本是否益出~文本必须是单行
	tooltipDisabled: false,
	isBeyond(e: any) {
		const ev = window.event || e
		const textContent = ev.target
		const clientW = textContent.clientWidth
		const scrollW = textContent.scrollWidth
		state.tooltipDisabled = scrollW > clientW
	},
	//序号
	indexMethod: computed(() => (i: number) => {
		const { current, pageSize } = props.pagination
		return current * pageSize - pageSize + (i + 1)
	})
})

const attribute = {
	tableLayout: 'fixed',
	rowKey: 'id',
	scroll: { x: 1000, scrollToFirstRowOnChange: true },
	...props.attr
}
</script>
