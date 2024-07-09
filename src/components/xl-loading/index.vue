<template>
	<div v-if="spinning" class="flex justify-center py-4">
		<a-spin :spinning="spinning" :tip="tip" :delay="delay">
			<slot></slot>
		</a-spin>
	</div>
</template>

<script setup lang="ts" name="Loading">
interface PropsType {
	tip?: string
	spinning?: boolean
	delay?: number
}
withDefaults(defineProps<PropsType>(), {
	tip: '数据加载中...',
	spinning: false,
	delay: 0
})
</script>

<style scoped land="scss"></style>
