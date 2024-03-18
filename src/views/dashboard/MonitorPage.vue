<template>
	<div></div>
</template>

<script setup lang="ts" name="MonitorPage">
import { useRoute } from 'vue-router'
const route = useRoute()
onMounted(() => {
	console.log(route.name)
})
</script>
