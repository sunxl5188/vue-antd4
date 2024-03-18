<template>
	<div>1111111111111111111</div>
</template>

<script setup lang="ts" name="AnalysisPage">
import { useRoute } from 'vue-router'
const route = useRoute()
onMounted(() => {
	console.log(route.name)
})
</script>
