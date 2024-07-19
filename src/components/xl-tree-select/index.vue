<template>
	<a-tree-select
		v-model:value="state.value"
		v-model:searchValue="state.searchValue"
		v-model:treeExpandedKeys="state.treeExpandedKeys"
		:tree-data="state.treeData"
		v-bind="attribute"
		v-on="onEvents"
	>
		<template #title="{ label }">
			<template v-for="(item, i) of label">
				<span
					v-if="state.searchValue.indexOf(item) >= 0"
					class="text-orange-500"
					:key="i"
				>
					{{ item }}
				</span>
				<template v-else>{{ item }}</template>
			</template>
		</template>
		<template #notFoundContent>
			<xl-loading :spinning="state.loading"></xl-loading>
			<xl-empty v-if="!state.loading"></xl-empty>
		</template>
	</a-tree-select>
</template>

<script setup lang="ts" name="TreeSelect">
import { loadDict } from '@/api/common'
import type { TreeSelectProps } from 'ant-design-vue'
import XlEmpty from '@/components/xl-empty/index.vue'
import XlLoading from '@/components/xl-loading/index.vue'

interface FieldNamesType {
	children: string
	label: string
	value: string
}

interface PropsType {
	value: string | Array<string> | undefined
	api?: string
	treeData?: TreeSelectProps['treeData']
	fieldNames?: FieldNamesType
	attr?: any
	event?: any
}
const props = withDefaults(defineProps<PropsType>(), {
	api: undefined,
	treeData: () => [],
	fieldNames: () => {
		return { children: 'children', label: 'label', value: 'value' }
	},
	attr: () => {},
	event: () => {}
})

const emit = defineEmits(['update:value'])

const state = reactive({
	loading: false,
	value: computed({
		get() {
			return props.value
		},
		set(val: any) {
			emit('update:value', val)
		}
	}),
	searchValue: '',
	treeData: [] as TreeSelectProps['treeData'],
	treeExpandedKeys: []
})

const attribute = {
	showSearch: true,
	style: { width: '100%' },
	dropdownStyle: { maxHeight: '400px', overflow: 'auto' },
	placeholder: '请选择',
	allowClear: true,
	maxTagCount: 2,
	//默认展开所有树节点
	treeDefaultExpandAll: false,
	//输入项过滤对应的 treeNode 属性
	treeNodeFilterProp: 'label',
	//替换 treeNode 中 label,value,children 字段为 treeData 中对应的字段
	fieldNames: { children: 'children', label: 'label', value: 'value' },
	multiple: true, //支持多选
	treeCheckable: true, //显示 checkbox
	treeCheckStrictly: true, //父子节点选中状态不再关联
	...props.attr
}

const onEvents = { ...props.event }

onBeforeMount(async () => {
	if (props.treeData) {
		state.treeData = props.treeData
	}
	if (props.api) {
		state.loading = true
		state.treeData = []
		state.treeData = await loadDict(props.api)
		state.loading = false
	}
	if (state.value?.length)
		state.treeExpandedKeys = state.value.map(
			(item: FieldNamesType) => item[props.fieldNames.value]
		)
})
</script>
