<template>
	<div>
		<img :src="url" />
		<xl-sharding-upload></xl-sharding-upload>
		<input type="file" @change="handleChange" />
	</div>
</template>

<script setup lang="ts">
//https://www.cnblogs.com/yinpengfei/p/17280585.html
const handleChange = async (e: any) => {
	const file = e.target.files[0]
	const Buffer = await fileToBuffer(file)
	const blob = await fileToBlob(file)
	console.log(Buffer)
	fileToBuffer(blob)
		.then(res => {
			console.log(res)
		})
		.catch(err => err)
	//url.value = URL.createObjectURL(files)
}
const url = ref()

/**
 * file、blob转arrayBuffer
 * @param file
 */
const fileToBuffer = (file: File | Blob): Promise<ArrayBuffer> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsArrayBuffer(file)
		reader.onload = (e: any) => {
			resolve(e.target.result)
		}
		reader.onerror = (err: any) => {
			reject(err)
		}
	})
}

/**
 * File 转 Blob
 * @param file {File}   file
 * @return {Promise<Blob>}
 */
const fileToBlob = (file: File): Promise<Blob> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (e: any) => {
			const { result } = e.target
			const blob =
				typeof result === 'object'
					? new Blob([result], { type: file.type })
					: result
			resolve(blob)
		}
		reader.onerror = (err: any) => {
			reject(err)
		}
		reader.readAsArrayBuffer(file)
	})
}
</script>
