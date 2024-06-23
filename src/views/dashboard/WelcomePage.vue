<template>
	<div>WelcomePage1111</div>
</template>

<script setup lang="ts" name="WelcomePage">
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
	console.log(router.getRoutes())
})
</script>
