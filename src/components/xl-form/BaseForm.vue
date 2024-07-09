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
				v-model:value="form.formData.b"
				:options="form.radioOption"
			/>
		</a-form-item>
		<a-form-item label="多选" name="c">
			<a-checkbox-group
				v-model:value="form.formData.c"
				:options="form.checkboxOption"
			>
			</a-checkbox-group>
		</a-form-item>
		<a-form-item label="下拉选项" name="d">
			<a-select
				v-model:value="form.formData.d"
				placeholder="请选择"
				allowClear
				:maxTagCount="2"
				:maxTagTextLength="5"
				mode="multiple"
				:filterOption="form.filterOption"
				optionFilterProp="value"
				showArrow
				show-search
				:fieldNames="{ label: 'label', value: 'value' }"
				:options="form.selectOption"
				@change="form.handleChange"
			>
			</a-select
			><!-- :getPopupContainer="() => document.body" -->
		</a-form-item>
	</a-form>
</template>

<script setup lang="ts" name="BaseForm">
import type { FormInstance } from 'ant-design-vue'

const defaultForm = {
	a: undefined,
	b: undefined,
	c: undefined,
	d: undefined,
	e: undefined,
	f: undefined,
	j: undefined
}
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
		console.log(params, document)
	},
	//验证失败
	handleFinishFailed(error: any): void {
		console.log(error)
	},
	radioOption: [
		{
			label: '单选一',
			value: '1'
		},
		{
			label: '单选二',
			value: '2'
		}
	],
	checkboxOption: [
		{
			label: '门店',
			value: '1'
		},
		{
			label: '经销商',
			value: '2'
		},
		{
			label: '供应商',
			value: '3'
		},
		{
			label: '其他商家',
			value: '4'
		}
	],
	selectOption: [
		{ value: '4', label: '总代' },
		{ value: '1', label: '一级代理' },
		{ value: '2', label: '专区代理' },
		{ value: '3', label: '二级代理' }
	],
	handleChange() {},
	filterOption(val: string, option: Array<any>) {
		console.log(val, option)
		return (option as any).label.indexOf(val) >= 0
	}
})
</script>
