<template>
	<div>
		<xl-auto-complete
			v-model:value="search.formData.a"
			type="textarea"
		></xl-auto-complete>
		<!-- <xl-sharding-upload></xl-sharding-upload> -->
	</div>
</template>

<script setup lang="ts">
const search = reactive({
	formData: {
		a: undefined,
		b: undefined
	},
	formItem: [
		{
			label: '公司名称',
			prop: 'a',
			formItemAttr: {},
			attribute: {}
		},
		{
			label: '下拉选项',
			prop: 'b',
			type: 'select',
			formItemAttr: {},
			attribute: {
				options: [
					{
						label: '1',
						value: '1'
					}
				]
			}
		}
	],
	handleSearch: (data: any) => {
		console.log(data)
	}
})
</script>
