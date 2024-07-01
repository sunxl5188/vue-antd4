<template>
	<a-radio-group v-model:value="state.checked" @change="state.handleChange">
		<a-radio
			v-for="(item, i) in options"
			:key="i"
			:value="item[fieldNames.value]"
		>
			{{ item[fieldNames.label] }}
		</a-radio>
	</a-radio-group>
</template>

<script setup lang="ts" name="RadioComponent">
interface FieldName {
	label: string
	value: string
}
interface PropsType {
	fieldNames?: FieldName
	options: Array<FieldName>
	value: string
	label: string
}

const props = withDefaults(defineProps<PropsType>(), {
	fieldNames: () => {
		return { label: 'label', value: 'value' }
	},
	options: () => []
})

const emit = defineEmits(['update:value', 'update:label', 'change'])

const state = reactive({
	value: undefined as string | number | undefined,
	checked: computed({
		get: () => props.value,
		set: (val: string | number) => {
			state.value = val
		}
	}),
	handleChange: () => {
		const data = props.options.filter(
			o => o[props.fieldNames.value] === state.value
		)
		const label = data.length ? data[0][props.fieldNames.label] : ''
		emit('update:value', state.value)
		emit('update:label', label)
	}
})
</script>
