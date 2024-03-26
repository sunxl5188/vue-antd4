<template>
	<div>
		<ImgCropper />
	</div>
</template>

<script setup lang="ts" name="WelcomePage">
import ImgCropper from '@/components/img-cropper/index.vue'
const route = useRoute()

onMounted(() => {
	console.log(route.name)
})
</script>

<style scoped land="scss"></style>
