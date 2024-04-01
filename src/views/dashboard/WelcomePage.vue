<template>
	<div>WelcomePage</div>
</template>

<script setup lang="ts" name="WelcomePage">
const route = useRoute()

onMounted(() => {
	console.log(route.name)
})
</script>

<style scoped land="scss"></style>
