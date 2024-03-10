<template>
	<svg :class="svgClass" aria-hidden="true">
		<use class="svg-use" :href="symbolId" :color="color" />
		<title v-if="iconTitle">{{ iconTitle }}</title>
	</svg>
</template>

<script setup lang="ts" name="SvgIcon">
interface PropsType {
	prefix?: string
	name: string
	color?: string
	className?: string
	iconTitle?: string
}
const props = withDefaults(defineProps<PropsType>(), {
	prefix: 'icon',
	name: '',
	color: '',
	className: '',
	iconTitle: ''
})

const symbolId = computed(() => `#${props.name}`)

const svgClass = computed(() => {
	if (props.className) {
		return `svg-icon ${props.className}`
	}
	return 'svg-icon'
})
</script>

<style scoped land="less">
.svg-icon {
	/* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
	vertical-align: -0.1em;
	/* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
	fill: currentColor;
	overflow: hidden;
}
</style>
