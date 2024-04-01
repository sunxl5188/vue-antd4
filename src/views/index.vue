<template>
	<div>
		{{ $t('car') }}
		<a-card title="Default size card" style="width: 300px">
			<template #extra><a href="#">more</a></template>
			<p>card content</p>
			<p>card content</p>
			<p>card content</p>
		</a-card>
	</div>
</template>

<script setup lang="ts" name="AdminIndex">
onMounted(() => {})
</script>

<style scoped></style>
