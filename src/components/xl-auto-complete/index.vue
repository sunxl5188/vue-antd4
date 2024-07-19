<template>
	<a-auto-complete
		v-model:value="state.value"
		:options="state.options"
		v-bind="attribute"
		v-on="onEvents"
	>
		<a-textarea
			v-if="type === 'textarea'"
			placeholder="input here"
			class="custom"
			style="height: 50px"
			@keypress="state.handleKeyPress"
		/>
	</a-auto-complete>
</template>

<script setup lang="ts" name="AutoComplete">
interface PropsType {
	value: string
	type: string
	attr: any
	event: any
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
	handleSelect() {},
	handleSearch() {},
	handleKeyPress() {},
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
	select: state.handleSelect,
	search: state.handleSearch,
	change: state.handleChange,
	...props.event
}
</script>
