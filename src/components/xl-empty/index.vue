<template>
	<a-empty :image="image" :description="description"></a-empty>
</template>

<script setup lang="ts" name="EmptyComponent">
import { Empty } from 'ant-design-vue'
interface PropsType {
	description?: string
	imageStyle?: any
	image?: string
}
withDefaults(defineProps<PropsType>(), {
	description: undefined,
	imageStyle: () => {},
	image: Empty.PRESENTED_IMAGE_SIMPLE
})
</script>
