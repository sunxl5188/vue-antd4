<template>
	<a-date-picker
		v-if="type === 'date'"
		v-model:value="state.value"
		v-bind="attribute"
		v-on="onEvents"
	></a-date-picker>
	<a-range-picker
		v-if="type === 'range'"
		v-model:value="state.value"
		v-bind="attribute"
		v-on="onEvents"
	></a-range-picker>
</template>

<script setup lang="ts" name="DatePicker">
interface PropsType {
	value: string
	type: string
}
const props = withDefaults(defineProps<PropsType>(), {
	type: 'date' //range
})

const emit = defineEmits(['update:value', 'change'])

const state = reactive({
	value: computed({
		get: () => props.value,
		set: () => {}
	}),
	handleChange(date: string): void {
		emit('update:value', date)
		emit('change', date)
	}
})

//属性
const attribute = {
	mode: 'time', //time | date | month | year | decade
	picker: 'date',
	placeholder: '请选择日期',
	valueFormat: 'YYYY-MM-DD hh:mm:ss'
}
//事件
const onEvents = {
	change: state.handleChange
}
</script>
