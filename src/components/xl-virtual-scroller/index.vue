<template>
	<!-- 基础 -->
	<RecycleScroller
		v-if="!dynamic"
		:items="dataSource"
		v-bind="{ ...attribute, ...attr }"
		v-on="{ ...events, ...event }"
		v-slot="{ item }"
		:style="Number.isFinite(height) ? `height:${height}px` : `height:${height}`"
	>
		<slot name="item" :item="item">--插槽内容--</slot>
	</RecycleScroller>
	<!-- 动态 -->
	<DynamicScroller
		v-if="dynamic"
		:items="dataSource"
		v-bind="{ ...attribute, ...attr }"
		v-on="{ ...events, ...event }"
		:style="Number.isFinite(height) ? `height:${height}px` : `height:${height}`"
	>
		<template v-slot="{ item, index, active }">
			<DynamicScrollerItem
				:item="item"
				:active="active"
				:size-dependencies="[item.message]"
				:data-index="index"
			>
				<slot name="item" :item="item">--插槽内容--</slot>
			</DynamicScrollerItem>
		</template>
	</DynamicScroller>
</template>

<script setup lang="ts" name="XlVirtualScroll">
import {
	RecycleScroller,
	DynamicScroller,
	DynamicScrollerItem
} from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

interface PropsType {
	height: number | string
	dataSource: Array<any>
	attr?: any
	event?: any
	dynamic?: boolean
}
const props = withDefaults(defineProps<PropsType>(), {
	dataSource: () => [],
	attr: () => {},
	event: () => {},
	height: 300,
	dynamic: false
})

const attribute = reactive({
	itemSize: props.dynamic ? undefined : 32,
	keyField: 'id',
	direction: 'vertical',
	listClass: '',
	itemClass: '',
	minItemSize: props.dynamic ? 54 : undefined
})

const events = reactive({})
</script>
