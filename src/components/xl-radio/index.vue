<template>
	<a-radio-group v-model:value="state.checked" @change="state.handleChange">
		<a-radio
			v-for="(item, i) in state.options"
			:key="i"
			:value="item[fieldNames.value]"
		>
			{{ item[fieldNames.label] }}
		</a-radio>
	</a-radio-group>
</template>

<script setup lang="ts" name="RadioComponent">
import { loadDict } from '@/api/common'

interface FieldName {
	label: string
	value: string
}
interface PropsType {
	fieldNames?: FieldName
	options?: Array<FieldName>
	value: string | undefined
	label?: string
	api?: string
}

const props = withDefaults(defineProps<PropsType>(), {
	fieldNames: () => {
		return { label: 'label', value: 'value' }
	},
	options: () => [],
	api: undefined
})

const emit = defineEmits(['update:value', 'update:label', 'change'])

const state = reactive({
	checked: computed({
		get: () => props.value,
		set: (val: string | number | undefined) => {
			emit('update:value', val)
		}
	}),
	options: [] as any[],
	handleChange: () => {
		const data = state.options.filter(
			o => o[props.fieldNames.value] === state.checked
		)
		const label = data.length ? data[0][props.fieldNames.label] : ''
		emit('update:label', label)
		emit('change', state.checked, label)
	}
})

onBeforeMount(async () => {
	state.options = props.options
	if (props.api) {
		state.options = await loadDict(props.api)
	}
})
</script>
