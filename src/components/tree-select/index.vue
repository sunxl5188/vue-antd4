<template>
	<a-tree-select
		v-model:value="state.value"
		v-model:searchValue="state.searchValue"
		:tree-data="state.treeData"
		v-bind="attribute"
		v-on="onEvents"
	>
		<template #title="{ label }">
			<template v-for="(item, i) in label" :key="i">
				<span
					v-if="state.searchValue.indexOf(item) >= 0"
					class="text-orange-500"
				>
					{{ item }}
				</span>
				<template v-else>{{ item }}</template>
			</template>
		</template>
	</a-tree-select>
</template>

<script setup lang="ts" name="TreeSelect">
interface PropsType {
	value: string | Array<string> | undefined
}
const props = withDefaults(defineProps<PropsType>(), {})
const state = reactive({
	value: computed({
		get() {
			return props.value
		},
		set() {}
	}),
	searchValue: '',
	treeData: [
		{
			label: 'parent 1',
			value: '1',
			children: [
				{
					label: 'parent 1-0',
					value: '1-1',
					children: [
						{
							label: 'my leaf',
							value: '1-1-1'
						},
						{
							label: 'your leaf',
							value: '1-1-2'
						}
					]
				},
				{
					label: 'parent 1-1',
					value: '1-2'
				}
			]
		}
	]
})

const attribute = {
	showSearch: true,
	style: { width: '100%' },
	dropdownStyle: { maxHeight: '400px', overflow: 'auto' },
	placeholder: '请选择',
	allowClear: true,
	treeDefaultExpandAll: true,
	treeNodeFilterProp: 'label'
}

const onEvents = {}
</script>
