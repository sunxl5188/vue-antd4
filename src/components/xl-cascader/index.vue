<template>
	<a-cascader
		v-model:value="state.checked"
		v-bind="attribute"
		v-on="onEvents"
		class="w-full"
	>
		<template #notFoundContent>
			<xl-loading :spinning="state.loading"></xl-loading>
			<xl-empty v-if="!state.loading"></xl-empty>
		</template>
	</a-cascader>
</template>

<script setup lang="ts" name="CascaderComponent">
import type { CascaderProps } from 'ant-design-vue'
import { loadDict } from '@/api/common'
import XlEmpty from '@/components/xl-empty/index.vue'
import XlLoading from '@/components/xl-loading/index.vue'

interface PropsType {
	value: string[] | undefined
	label?: string[]
	attr?: any
	event?: any
	api?: string
}
const props = withDefaults(defineProps<PropsType>(), {
	attr: () => {},
	event: () => {
		return {}
	}
})

const emit = defineEmits(['update:value', 'update:label'])

const state = reactive({
	loading: false,
	checked: computed({
		get: () => props.value,
		set: (val: string[] | undefined) => {
			emit('update:value', val)
		}
	}),
	handleChange: (
		data: string[],
		selectedOptions: CascaderProps['options'][]
	) => {
		let label = [] as any[]
		if (selectedOptions) {
			label = selectedOptions.map(
				item => item![attribute.value.fieldNames.label]
			)
		}
		emit('update:label', label)
		if (props.event.change) props.event.change(data, selectedOptions)
	},
	loadData: async selectedOptions => {
		const targetOption = selectedOptions[selectedOptions.length - 1]
		targetOption.loading = true
		targetOption.children = await loadDict('/index/index/getCityList')
		targetOption.loading = false
		attribute.value.options = [...attribute.value.options]
	}
})

const attribute = ref({
	expandTrigger: 'click',
	placeholder: '请选择',
	fieldNames: { label: 'label', value: 'value', children: 'children' },
	showSearch: {
		filter: (inputValue: string, path: any) => {
			return path.some(option => {
				return (
					option[attribute.value.fieldNames.label]
						.toLowerCase()
						.indexOf(inputValue.toLowerCase()) > -1
				)
			})
		}
	},
	loadData: state.loadData,
	...props.attr
})

const onEvents = {
	...props.event,
	change: state.handleChange
}

onBeforeMount(async () => {
	if (props.api) {
		state.loading = true
		attribute.value.options = []
		attribute.value.options = await loadDict(props.api)
		state.loading = false
	}
})
</script>
