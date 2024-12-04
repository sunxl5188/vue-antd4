<template>
	<div>
		<a-card title="Default size card" style="width: 300px">
			<template #extra><a href="#">more</a></template>
			<p>card content</p>
			<p>card content</p>
			<p>card content{{ count }}</p>
		</a-card>
	</div>
</template>

<script setup lang="ts" name="AdminIndex">
//import { useRouter } from 'vue-router'
//const router = useRouter()
import { useCountDown } from '@/hooks/countDown'

const { count, countDown } = useCountDown()

onMounted(() => {
	countDown(5)
})
</script>

<style scoped></style>
