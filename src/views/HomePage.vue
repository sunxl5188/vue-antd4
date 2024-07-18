<template>
	<div>
		<img :src="url" style="width: 500px" />
		<xl-sharding-upload></xl-sharding-upload>
		<input type="file" @change="handleChange" />
	</div>
</template>

<script setup lang="ts">
//https://www.cnblogs.com/yinpengfei/p/17280585.html
const handleChange = async (e: any) => {
	const file = e.target.files[0]
	const img = new Image()
	img.onload = (e: any) => {
		console.log(e.target.result)
	}
}
const url = ref()
</script>
