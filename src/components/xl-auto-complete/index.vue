<template>
	<a-auto-complete
		v-model:value="state.value"
		:options="state.options"
		v-bind="attribute"
		v-on="onEvents"
	>
		<a-textarea v-if="type === 'textarea'" @keypress="state.handleKeyPress" />
	</a-auto-complete>
</template>

<script setup lang="ts" name="AutoComplete">
interface PropsType {
	value: string | undefined
	type?: string
	attr?: any
	event?: any
}
const props = withDefaults(defineProps<PropsType>(), {
	type: 'input', //textarea
	attr: () => {},
	event: () => {}
})

const emit = defineEmits(['update:value'])

const state = reactive({
	value: computed({
		get: () => props.value,
		set: () => {}
	}),
	options: [],
	handleChange(val: string) {
		emit('update:value', val)
	}
})
//属性
const attribute = {
	class: 'w-full',
	placeholder: '请输入',
	...props.attr
}
//事件
const onEvents = {
	change: state.handleChange,
	...props.event
}
</script>
