<template>
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
		<a-form-item label="输入框" name="a">
			<a-input v-model:value="form.formData.a" placeholder="" allowClear />
		</a-form-item>
		<a-form-item label="单选" name="b">
			<a-radio-group
				v-model:value="form.formData.a"
				:options="form.radioOption"
			/>
		</a-form-item>
	</a-form>
</template>

<script setup lang="ts" name="BaseForm">
import type { FormInstance } from 'ant-design-vue'

const defaultForm = {}
const form = reactive({
	formRef: ref<FormInstance>(),
	initData: { ...defaultForm },
	formData: { ...defaultForm },
	formRules: {},
	//提交数据
	handleSubmit() {
		form.formRef
			?.validate()
			.then((res: any) => {
				console.log(res)
			})
			.catch((err: any) => {
				console.log(err)
			})
	},
	//重置表单
	handleReset(): void {
		form.formData = { ...form.initData }
		form.formRef?.clearValidate()
	},
	//验证通过
	handleFinish(params: any): void {
		console.log(params)
	},
	//验证失败
	handleFinishFailed(error: any): void {
		console.log(error)
	},
	radioOption: [
		{
			title: '单选一',
			value: '1'
		},
		{
			title: '单选二',
			value: '2'
		}
	]
})
</script>
