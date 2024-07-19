<template>
	<a-input-number
		v-model:value="state.value"
		v-bind="attribute"
		v-on="event"
	></a-input-number>
</template>

<script setup lang="ts" name="InputNumber">
interface PropsType {
	value: number | undefined
	attr?: any
	event?: any
}
const props = withDefaults(defineProps<PropsType>(), {
	attr: () => {},
	event: () => {
		return {}
	}
})

const emit = defineEmits(['update:value'])

const state = reactive({
	value: computed({
		get: () => props.value,
		set(val: number | undefined) {
			emit('update:value', val)
		}
	})
})

const attribute = {
	min: 1,
	max: Infinity,
	stringMode: true,
	precision: 0,
	//defaultValue: 1,
	...props.attr
}
</script>
