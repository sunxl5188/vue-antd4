<template>
	<a-cascader
		v-model:value="state.checked"
		:options="state.options"
		v-bind="attribute"
		v-on="onEvents"
	></a-cascader>
</template>

<script setup lang="ts" name="CascaderComponent">
interface PropsType {
	value: string[]
	label: string[]
	options: string[]
	attr?: any
	events?: any
}
const props = withDefaults(defineProps<PropsType>(), {
	attr: () => {},
	events: () => {},
	options: () => []
})

const emit = defineEmits(['update:value', 'update:label', 'change'])

const attribute = {
	expandTrigger: 'hover',
	placeholder: '请选择',
	fieldNames: { label: 'label', value: 'value', children: 'children' },
	showSearch: {
		filter: (inputValue: string, path: any) => {
			return path.label.indexOf(inputValue) >= 0
		}
	},
	...props.attr
}
const state = reactive({
	checked: computed({
		get: () => props.value,
		set: () => {}
	}),
	options: computed({
		get: () => props.options,
		set: () => {}
	}),
	handleChange: (data: string[], selectedOptions: any[]) => {
		const label = selectedOptions.map(item => item[attribute.fieldNames.label])
		emit('update:value', data)
		emit('update:label', label)
		emit('change', data, selectedOptions)
	}
})

//事件
const onEvents = {
	change: state.handleChange,
	...props.events
}
</script>
