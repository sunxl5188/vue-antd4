<template>
	<a-form-item-rest>
		<a-flex justify="space-between" align="center" gap="middle" class="w-full">
			<a-input-number
				v-model:value="state.startVal"
				v-bind="attribute[0]"
				v-on="onEvents"
				class="flex-1"
			/>
			<div class="text-center text-gray-400">-</div>
			<a-input-number
				v-model:value="state.endVal"
				v-bind="attribute[1]"
				v-on="onEvents"
				class="flex-1"
			/>
		</a-flex>
	</a-form-item-rest>
</template>

<script setup lang="ts" name="NumberSection">
interface PropsType {
	value: Array<number>
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
	startVal: computed({
		get: () => props.value[0],
		set: (val: number) => {
			let data = [...props.value]
			data[0] = val
			emit('update:value', data)
		}
	}),
	endVal: computed({
		get: () => props.value[1],
		set: (val: number) => {
			let data = [...props.value]
			data[1] = val
			emit('update:value', data)
		}
	}),
	handleChange: () => {
		const data = [...props.value]
		if (data[0] && data[1]) {
			const arrays = data.sort((a, b) => a - b)
			emit('update:value', arrays)
		}
		if (props.event.blur) props.event.blur()
	}
})

const attribute = [
	{
		min: 1,
		max: Infinity,
		stringMode: true,
		precision: 0,
		placeholder: '请输入',
		...props.attr
	},
	{
		min: 1,
		max: Infinity,
		stringMode: true,
		precision: 0,
		placeholder: '请输入',
		...props.attr
	}
]

const onEvents = {
	...props.event,
	blur: state.handleChange
}
</script>
