<template>
	<a-input-number
		v-model:value="state.value"
		v-bind="attribute"
		v-on="onEvents"
	></a-input-number>
</template>

<script setup lang="ts" name="InputNumber">
interface PropsType {
	value: string
}
const props = withDefaults(defineProps<PropsType>(), {})

const state = reactive({
	value: computed({
		get: () => props.value,
		set() {}
	}),
	handleChange(): void {}
})

const attribute = {
	min: 1,
	max: 10,
	stringMode: true,
	precision: 1
}
const onEvents = {
	change: state.handleChange
}
</script>
