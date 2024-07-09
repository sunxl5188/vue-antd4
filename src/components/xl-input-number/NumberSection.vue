<template>
	<a-flex vertical justify="space-between" align="center" gap="middle">
		<a-input-number
			v-model:value="state.startVal"
			v-bind="attribute"
			@change="state.handleChange"
		/>
		<a-input-number
			v-model:value="state.endVal"
			v-bind="attribute"
			@change="state.handleChange"
		/>
	</a-flex>
</template>

<script setup lang="ts" name="NumberSection">
interface PropsType {
	startVal: number
	endVal: number
	attr: any
}
const props = withDefaults(defineProps<PropsType>(), {
	attr: () => {}
})

const emit = defineEmits(['update:value'])

const state = reactive({
	startData: 0,
	endData: 0,
	startVal: computed({
		get: () => props.startVal,
		set: (val: number) => {
			state.startData = val
		}
	}),
	endVal: computed({
		get: () => props.endVal,
		set: (val: number) => {
			state.endData = val
		}
	}),
	handleChange: () => {
		const data = [state.startData, state.endData].sort((a, b) => a - b)
		emit('update:value', data)
	}
})

const attribute = {
	allowClear: false,
	...props.attr
}
</script>
