<template>
	<span>
		<a-range-picker
			v-if="type === 'range'"
			v-model:value="state.value"
			v-bind="attributeRange"
			v-on="onEvents"
		></a-range-picker>
		<a-date-picker
			v-else
			v-model:value="state.value"
			v-bind="attribute"
			v-on="onEvents"
		></a-date-picker>
	</span>
</template>

<script setup lang="ts" name="DatePicker">
interface PropsType {
	value: string | undefined
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
	mode: 'date', //time | date | month | year | decade
	picker: 'date',
	placeholder: '请选择日期',
	valueFormat: 'YYYY-MM-DD hh:mm:ss',
	showTime: true,
	showNow: true
}
//属性
const attributeRange = {
	mode: ['date', 'date'], //time | date | month | year | decade
	picker: 'date',
	placeholder: ['请选择开始日期', '请选择结束日期'],
	valueFormat: 'YYYY-MM-DD hh:mm:ss',
	showTime: true
}
//事件
const onEvents = {
	change: state.handleChange
}
</script>
<style lang="less" scoped>
::v-deep {
	.ant-picker {
		width: 100% !important;
	}
}
</style>
