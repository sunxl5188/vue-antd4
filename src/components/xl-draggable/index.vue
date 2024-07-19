<template>
	<draggable
		v-model="dataSource"
		v-bind="draggableAttr"
		@start="onStart"
		@end="onEnd"
	>
		<template #item="{ element }">
			<div>
				<slot :item="element"></slot>
			</div>
		</template>
	</draggable>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

interface PropsType {
	modelValue: any[]
	config?: any
}
const props = withDefaults(defineProps<PropsType>(), {
	modelValue: () => [],
	config: () => {}
})

const draggableAttr = computed({
	get() {
		return {
			itemKey: 'id',
			//group	如果一个页面有多个拖拽区域，通过设置group名称可以实现多个区域之间相互拖拽
			//或者 { name: "...", pull: [true, false, 'clone', array , function], put: [true, false, array , function] }
			sort: true, //	是否开启排序,如果设置为false,它所在组无法排序
			delay: 0, //	鼠标按下多少秒之后可以拖拽元素
			touchStartThreshold: 0, //	鼠标按下移动多少px才能拖动元素
			disabled: false, //	是否启用拖拽组件
			animation: 500, //	拖动时的动画效果，如设置animation=1000表示1秒过渡动画效果
			handle: '.mover', //只有当鼠标在class为mover类的元素上才能触发拖到事件
			//filter: '', //	:filter=".unmover" 设置了unmover样式的元素不允许拖动
			//draggable: '', //	:draggable=".item" 样式类为item的元素才能被拖动
			//ghostClass: 'sortable-ghost', //	:ghost-class="ghostClass" 设置拖动元素的占位符类名,你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
			//chosenClass: 'sortable-chosen', //	:ghost-class="hostClass" 被选中目标的样式，你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
			//dragClass: 'dragClass', //	:drag-class="dragClass"拖动元素的样式，你的自定义样式可能需要加!important才能生效，并把forceFallback属性设置成true
			forceFallback: true, //	默认false，忽略HTML5的拖拽行为，因为h5里有个属性也是可以拖动，你要自定义ghostClass chosenClass dragClass样式时，建议forceFallback设置为true
			fallbackClass: false, //	默认false，克隆选中元素的样式到跟随鼠标的样式
			fallbackOnBody: false, //	默认false，克隆的元素添加到文档的body中
			fallbackTolerance: 0, //	按下鼠标移动多少个像素才能拖动元素，:fallback-tolerance="8"
			scroll: true, //	默认true,有滚动区域是否允许拖拽
			//scrollFn	滚动回调函数
			//scroll-fensitivity	距离滚动区域多远时，滚动滚动条
			//scroll-speed	滚动速度
			...props.config
		}
	},
	set() {}
})

const emit = defineEmits(['update:model-value', 'onStart', 'onEnd'])

const dataSource = computed({
	get() {
		return props.modelValue
	},
	set(e: any) {
		emit('update:model-value', e)
	}
})

//拖拽开始的事件
const onStart = () => {
	//console.log('开始拖拽')
	emit('onStart')
}

//拖拽结束的事件
const onEnd = () => {
	//console.log('结束拖拽')
	emit('onEnd')
}
</script>

<style scoped lang="less"></style>
