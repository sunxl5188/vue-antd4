<template>
	<a-form
		:ref="(el: FormInstance) => (form.formRef = el)"
		:model="form.formData"
		:rules="rules"
		v-bind="form.formAttribute"
		class="px-0.5"
	>
		<a-row type="flex" justify="start" :gutter="1">
			<a-col
				v-for="(item, i) in formItem"
				:key="i"
				:span="item.span"
				v-bind="item.span ? { span: item.span } : layout"
			>
				<!-- 插槽 -->
				<template v-if="item.slotName">
					<slot :name="item.slotName" :item="item" :formData="form.formData">
						--插槽--
					</slot>
				</template>
				<a-form-item
					v-else
					:label="item.label"
					:name="item.prop"
					v-bind="item.formItemAttr"
				>
					<!-- 选择框 -->
					<XlSelect
						v-if="item.type === 'select'"
						v-model:value="form.formData[item.prop]"
						:attr="item.attribute"
						:events="item.events || {}"
					></XlSelect>
					<!-- tree -->
					<XlTreeSelect
						v-else-if="item.type === 'tree'"
						v-model:value="form.formData[item.prop]"
						:treeData="item.attribute.options || []"
						:api="item.api"
						:attr="{
							allowClear: true,
							showSearch: true,
							placeholder: '请选择',
							...item.attribute
						}"
						:events="item.events || {}"
					></XlTreeSelect>
					<!-- date-picker range-->
					<XlDatePicker
						v-else-if="item.type === 'date' || item.type === 'range'"
						v-model:value="form.formData[item.prop]"
						:type="item.type"
						:attr="item.attribute"
						:events="item.events || {}"
					></XlDatePicker>
					<!-- Cascader -->
					<XlCascader
						v-else-if="item.type === 'cascader'"
						v-model:value="form.formData[item.prop]"
						:attr="item.attribute"
						:events="item.events || {}"
					></XlCascader>
					<!-- Checkbox -->
					<XlCheckbox
						v-else-if="item.type === 'checkbox'"
						v-model:value="form.formData[item.prop]"
						:attr="item.attribute"
						:events="item.events || {}"
					></XlCheckbox>
					<!-- radio -->
					<XlRadio
						v-else-if="item.type === 'radio'"
						v-model:value="form.formData[item.prop]"
						:attr="item.attribute"
						:events="item.events || {}"
					></XlRadio>
					<!-- number -->
					<XlInputNumber
						v-else-if="item.type === 'number'"
						v-model:value="form.formData[item.prop]"
						:attr="item.attribute"
						:events="item.events || {}"
					></XlInputNumber>
					<!-- 输入框文本 -->
					<a-input
						v-else
						v-model:value="form.formData[item.prop]"
						v-bind="{
							clearable: true,
							placeholder: '请输入',
							...item.attribute
						}"
						v-on="item.events || {}"
					/>
				</a-form-item>
			</a-col>
		</a-row>
		<slot
			name="footer"
			:handleSubmit="form.handleSubmit"
			:handleReset="form.handleReset"
		>
			<a-row type="flex" justify="center">
				<a-col>
					<a-space>
						<a-button type="primary" @click="form.handleSubmit">保存</a-button>
						<a-button @click="form.handleReset">重置</a-button>
					</a-space>
				</a-col>
			</a-row>
		</slot>
	</a-form>
</template>

<script setup lang="ts" name="BaseForm">
import type { FormInstance } from 'ant-design-vue'
import XlSelect from '@/components/xl-select/index.vue'
import XlTreeSelect from '@/components/xl-tree-select/index.vue'
import XlDatePicker from '@/components/xl-date-picker/index.vue'
import XlCascader from '@/components/xl-cascader/index.vue'
import XlCheckbox from '@/components/xl-checkbox/index.vue'
import XlRadio from '@/components/xl-radio/index.vue'
import XlInputNumber from '@/components/xl-input-number/NumberSection.vue'

interface PropsType {
	formData: any
	formItem: Array<any>
	rules: any
	formAttribute?: any
	layout?: any
}
const props = withDefaults(defineProps<PropsType>(), {
	formData: () => {
		return {}
	},
	formItem: () => {
		return []
	},
	rules: () => {
		return {}
	},
	formAttribute: () => {},
	layout: () => {
		return {
			xs: 24,
			sm: 12,
			md: 12,
			lg: 8,
			xl: 8,
			xxl: 6
		}
	}
})

const emit = defineEmits(['submit'])

const form = reactive({
	formAttribute: {
		labelCol: { span: 6 },
		wrapperCol: { span: 18 },
		autocomplete: 'off',
		scrollToFirstError: true,
		...props.formAttribute
	},
	formRef: ref<FormInstance>(),
	initData: { ...props.formData },
	formData: { ...props.formData },
	//提交数据
	handleSubmit() {
		form.formRef
			?.validate()
			.then((params: any) => {
				emit('submit', params)
			})
			.catch((err: any) => {
				console.log(err)
			})
	},
	//重置表单
	handleReset(): void {
		form.formData = { ...form.initData }
		form.formRef?.clearValidate()
	}
})
</script>
