<template>
	<a-select
		v-model:value="form.value"
		:options="dataSource"
		class="w-full"
		v-bind="attribute"
		v-on="onEvents"
	>
	</a-select>
</template>

<script setup lang="ts" name="commonSelect">
interface PropsType {
	value: any
	attr?: any
	events?: any
	dataSource: Array<any>
}
const props = withDefaults(defineProps<PropsType>(), {
	value: undefined,
	attr: () => {},
	events: () => {},
	dataSource: () => []
})

const emit = defineEmits(['update:value', 'change'])

// 属性
const attribute = computed(() => {
	return {
		...{
			fieldNames: { label: 'label', value: 'value' },
			showArrow: true,
			showSearch: true,
			placeholder: '请选择',
			allowClear: true,
			maxTagCount: 2,
			maxTagTextLength: 5,
			mode: 'default', //default / multiple / tags / combobox
			filterOption: form.filterOption,
			optionFilterProp: 'value'
		},
		...props.attr
	}
})

//事件
const onEvents = computed(() => {
	return {
		...{
			change: form.handleChange
		},
		...props.events
	}
})
interface OptionType {
	label: string
	value: string | number
}
type arrayType = Array<string | number>
type valueType = string | string[] | undefined
type callbackType = string | arrayType

const form = reactive({
	checked: undefined as valueType,
	value: computed({
		get: () => props.value,
		set: (val: valueType) => {
			form.checked = val
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
	handleChange: (data: callbackType) => {
		const isArray = Array.isArray(data)
		let label
		let list = [] as Array<any>
		if (isArray) {
			label = [] as arrayType
			list = props.dataSource.filter(o => data.includes(o.value))
			list.forEach((item: any) => {
				label.push(item.label)
			})
		} else {
			let val = data as string | number
			label = '' as string
			list = props.dataSource.filter(o => o.value === val)
			label = list[0].label
		}
		emit('change', data, label, list)
	}
})
</script>
<style lang="less" scoped>
::v-deep(.ant-spin) {
	color: rgba(0, 0, 0, 0.25);
	font-size: 14px;
}
</style>
