<template>
	<a-tree-select
		v-model:value="state.value"
		show-search
		style="width: 100%"
		:dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
		placeholder="Please select"
		allow-clear
		tree-default-expand-all
		:tree-data="state.treeData"
		tree-node-filter-prop="label"
	>
		<template #title="{ value: val, label }">
			<b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
			<template v-else>{{ label }}</template>
		</template>
	</a-tree-select>
</template>

<script setup lang="ts" name="TreeSelect">
interface PropsType {
	value: string
}
const props = withDefaults(defineProps<PropsType>(), {})
const state = reactive({
	value: computed({
		get() {
			return props.value
		},
		set() {}
	}),
	treeData: [
		{
			label: 'parent 1',
			value: 'parent 1',
			children: [
				{
					label: 'parent 1-0',
					value: 'parent 1-0',
					children: [
						{
							label: 'my leaf',
							value: 'leaf1'
						},
						{
							label: 'your leaf',
							value: 'leaf2'
						}
					]
				},
				{
					label: 'parent 1-1',
					value: 'parent 1-1'
				}
			]
		}
	]
})
</script>
