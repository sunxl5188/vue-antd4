<template>
	<div>
		<a-form
			:ref="(el: FormInstance) => (form.formRef = el)"
			:model="form.formData"
			:label-col="{ span: 6 }"
			:wrapper-col="{ span: 18 }"
			autocomplete="off"
			scrollToFirstError
			@finish="form.handleFinish"
			@finishFailed="form.handleFinishFailed"
		>
			<a-form-item
				label="测试"
				name="text"
				:rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
			>
				<a-input v-model:value="form.formData.text" placeholder="" allowClear />
			</a-form-item>
			<template v-for="(item, i) in form.formData.list" :key="i">
				<a-form-item :label="item.label" name="switch">
					<a-switch v-model:checked="form.formData.list[i].switch" />
				</a-form-item>
				<template v-if="form.formData.list[i].switch">
					<a-form-item
						label="表单1"
						:name="['list', i, 'children', 'a']"
						:rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
					>
						<a-input
							v-model:value="item.children.a"
							placeholder=""
							allowClear
						/>
					</a-form-item>
					<a-form-item label="表单2" name="b">
						<a-input
							v-model:value="form.formData.list[i].children.b"
							placeholder=""
							allowClear
						/>
					</a-form-item>
				</template>
			</template>
			<a-button type="primary" htmlType="submit">11111</a-button>
		</a-form>
		<!-- <MapContainer /> -->
		<!-- <xl-upload :attribute="{ action: 'http://www.baidu.com' }"></xl-upload> -->
	</div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'
//import * as echarts from 'echarts'
//import XlUpload from '@/components/xl-upload/index.vue'
//import MapContainer from '@/components/MapContainer.vue'
const form = reactive({
	formRef: ref(),
	formData: {
		text: '',
		list: [
			{
				label: '表单1',
				switch: false,
				a: '1',
				children: {
					a: '',
					b: ''
				}
			},
			{
				label: '表单2',
				switch: false,
				a: '1',
				children: {
					a: '',
					b: ''
				}
			}
		]
	},
	handleFinish() {},
	handleFinishFailed() {}
})
</script>

<style lang="less" scoped></style>
