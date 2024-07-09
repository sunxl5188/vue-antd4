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
		:options="state.options"
		@change="state.handleChange"
	/>
</template>

<script setup lang="ts" name="CheckboxComponent">
import { loadDict } from '@/api/common'
interface OptionType {
	label: string
	value: string | number
}

type ValueType = Array<string | number>

interface PropsType {
	value: ValueType | undefined
	label?: Array<string>
	all?: boolean
	options?: Array<OptionType>
	api?: string
}

const props = withDefaults(defineProps<PropsType>(), {
	all: false,
	options: () => [],
	api: undefined
})

const emit = defineEmits(['update:value', 'update:label', 'change'])

const state = reactive({
	checked: [] as ValueType | undefined,
	checkedList: computed({
		get: () => props.value,
		set: (val: ValueType | undefined) => {
			state.checked = val
			emit('update:value', val)
		}
	}),
	labelList: [] as Array<string>,
	checkedData: [] as Array<OptionType>,
	optionData: [] as Array<string | number>,
	options: [] as Array<OptionType>,
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
	},
	setCheckState: () => {
		if (state.checked) {
			state.indeterminate =
				!!state.checked.length && state.checked.length < state.optionData.length
			state.checkAll = state.checked.length === state.optionData.length
		}
	}
})
//==========================
onBeforeMount(async () => {
	state.options = props.options
	state.checked = props.value
	if (props.api) {
		state.options = await loadDict(props.api)
	}
	state.optionData = state.options.map(item => item.value)
	state.setCheckState()
})

watch(
	() => state.checked,
	() => {
		state.setCheckState()
	},
	{ deep: true }
)
</script>
