<template>
	<a-select
		v-model:value="state.value"
		class="w-full"
		:options="state.options"
		v-bind="attribute"
		v-on="onEvents"
	></a-select>
</template>

<script setup lang="ts" name="commonSelect">
import { loadDict } from '@/api/common'
import type { SelectProps } from 'ant-design-vue'

type ValueType = string | Array<string | number> | undefined
interface PropsType {
	value: ValueType
	attr?: any
	event?: any
	api?: string
}
interface OptionType {
	label: string
	value: string | number
}
type arrayType = Array<string | number>
type callbackType = string | arrayType

const props = withDefaults(defineProps<PropsType>(), {
	value: undefined,
	attr: () => {},
	event: () => {},
	api: undefined
})

const emit = defineEmits(['update:value', 'update:label', 'change'])
const state = reactive({
	options: [] as any[],
	value: computed({
		get: () => props.value,
		set: (val: ValueType) => {
			emit('update:value', val)
		}
	}),
	filterOption: (val: string, option: OptionType) => {
		return option.label.indexOf(val) >= 0
	},
	/**
	 * change回调
	 * @param selectedValue 选中的code
	 * @param selectedLabel 选中的label
	 * @param selectedDataList 选中的数组
	 */
	handleChange: (data: callbackType, option: SelectProps['options']) => {
		const isArray = Array.isArray(data)
		if (isArray) {
			let label = [] as any[]
			;(option as []).forEach((item: any) => {
				label.push(item.label)
			})
			emit('update:label', label)
			emit('change', data, label, option)
		} else {
			let label = (option as any).label
			emit('update:label', label)
			emit('change', data, label, option)
		}
	}
})

// 属性
const attribute = {
	fieldNames: { label: 'label', value: 'value' },
	showArrow: true,
	showSearch: true,
	placeholder: '请选择',
	allowClear: true,
	maxTagCount: 2,
	maxTagTextLength: 5,
	mode: 'default', //default / multiple / tags / combobox
	filterOption: state.filterOption,
	optionFilterProp: 'value',
	...props.attr
}

//事件
const onEvents = {
	change: state.handleChange,
	...props.event
}

onBeforeMount(async () => {
	if (attribute.options) {
		state.options = attribute.options
		delete attribute.options
	}
	if (props.api) {
		state.options = await loadDict(props.api)
	}
})
</script>
<style lang="less" scoped>
::v-deep(.ant-spin) {
	color: rgba(0, 0, 0, 0.25);
	font-size: 14px;
}
</style>
