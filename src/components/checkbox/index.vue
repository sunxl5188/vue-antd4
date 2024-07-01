<template>
	<div v-if="all">
		<a-checkbox
			v-model:checked="state.checkAll"
			:indeterminate="state.indeterminate"
			@change="state.handleAllChange"
		>
			全选
		</a-checkbox>
	</div>
	<a-checkbox-group
		v-model:value="state.checkedList"
		:options="options"
		@change="state.handleChange"
	/>
</template>

<script setup lang="ts" name="CheckboxComponent">
interface OptionType {
	label: string
	value: string | number
}

type ValueType = Array<string | number>

interface PropsType {
	value: ValueType
	label: Array<string>
	all?: boolean
	options: Array<OptionType>
}

const props = withDefaults(defineProps<PropsType>(), {
	all: false,
	options: () => []
})

const emit = defineEmits(['update:value', 'update:label', 'change'])

const state = reactive({
	checked: [] as ValueType,
	checkedList: computed({
		get: () => props.value,
		set: (val: ValueType) => {
			state.checked = val
			emit('update:value', val)
		}
	}),
	labelList: [] as Array<string>,
	checkedData: [] as Array<OptionType>,
	optionData: computed((): ValueType => {
		return props.options.map(item => item.value)
	}),
	checkAll: false,
	indeterminate: false,
	handleAllChange: () => {
		if (state.checkAll) state.checked = [...state.optionData]
		else state.checked = []
		emit('update:value', state.checked)
		state.handleChange(state.checked)
	},
	handleChange: (e: ValueType) => {
		state.checked = e
		state.checkedData = props.options.filter(o => e.includes(o.value))
		state.labelList = state.checkedData.map(o => o.label)
		emit('update:label', state.labelList)
		emit('change', e, state.labelList, state.checkedData)
	}
})

watch(
	() => state.checkedList,
	(val: ValueType) => {
		state.indeterminate = !!val.length && val.length < state.optionData.length
		state.checkAll = val.length === state.optionData.length
	},
	{ deep: true, immediate: true }
)
</script>
