<template>
	<a-empty :description="description"></a-empty>
</template>

<script setup lang="ts" name="EmptyComponent">
interface PropsType {
	description?: string
	imageStyle?: any
	image?: string
}
withDefaults(defineProps<PropsType>(), {
	description: undefined,
	imageStyle: () => {},
	image: undefined
})
</script>
