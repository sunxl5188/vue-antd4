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

const attribute = computed(() => {
	return {
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
})

//事件
const onEvents = computed(() => {
	return {
		change: state.handleChange,
		...props.events
	}
})

const state = reactive({
	checked: computed({
		get: () => props.value,
		set: () => {}
	}),
	options: computed({
		get: () => props.options,
		set: () => {}
	}),
	handleChange: (data: any) => {
		emit('update:value', data)
	}
})
</script>
