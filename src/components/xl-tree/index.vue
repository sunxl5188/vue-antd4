<template>
	<a-input-search v-model:value="state.searchValue" placeholder="搜索" />
	<a-tree
		v-model:expandedKeys="state.expandedKeys"
		v-model:selectedKeys="state.selectedKeys"
		v-model:checkedKeys="state.checkedKeys"
		:tree-data="state.treeData"
		v-bind="attribute"
		v-on="onEvents"
	>
	</a-tree>
</template>

<script setup lang="ts" name="TreeComponent">
interface PropsType {
	value: string[]
	attr: any
	events: any
}
const props = withDefaults(defineProps<PropsType>(), {
	attr: () => {},
	events: () => {}
})

const state = reactive({
	searchValue: undefined,
	expandedKeys: [],
	selectedKeys: [],
	checkedKeys: [],
	autoExpandParent: true, //是否自动展开父节点
	treeData: [
		{ title: 'Expand to load', key: '0' },
		{ title: 'Expand to load', key: '1' },
		{ title: 'Tree Node', key: '2', isLeaf: true }
	],
	loadData: (treeNode: any) => {
		return new Promise<void>(resolve => {
			if (treeNode.dataRef.children) {
				resolve()
			} else {
				setTimeout(() => {
					treeNode.dataRef.children = [
						{ title: 'Child Node', key: `${treeNode.eventKey}-0` },
						{ title: 'Child Node', key: `${treeNode.eventKey}-1` }
					]
					state.treeData = [...state.treeData]
					resolve()
				}, 1000)
			}
		})
	}
})

const attribute = {
	checkable: true,
	fieldNames: { children: 'children', title: 'title', key: 'key' },
	loadData: state.loadData,
	...props.attr
}

const onEvents = {
	...props.events
}
</script>
