<template>
	<a-form
		:ref="(el: FormInstance) => (state.formRef = el)"
		:model="state.formData"
		autocomplete="off"
		v-bind="formAttribute"
	>
		<a-row :gutter="10" type="flex" justify="start">
			<template v-for="(item, i) in formItem" :key="i">
				<a-col v-show="i < state.colNum || state.expand" v-bind="layout">
					<!-- 插槽 -->
					<template v-if="item.slotName">
						<slot :name="item.slotName" :item="item" :formData="state.formData">
							--插槽--
						</slot>
					</template>
					<a-form-item v-else :label="item.label" :name="item.prop">
						<!-- 选择框 -->
						<XlSelect
							v-if="item.type === 'select'"
							v-model:value="state.formData[item.prop]"
							:attr="item.attribute"
							v-on="item.event || {}"
						></XlSelect>
						<!-- tree -->
						<XlTreeSelect
							v-else-if="item.type === 'tree'"
							v-model:value="state.formData[item.prop]"
							:attr="{
								allowClear: true,
								showSearch: true,
								placeholder: '请选择',
								...item.attribute
							}"
							v-on="item.event || {}"
						></XlTreeSelect>
						<!-- date-picker range-->
						<XlDatePicker
							v-else-if="item.type === 'date' || item.type === 'range'"
							v-model:value="state.formData[item.prop]"
							:type="item.type"
							:attr="item.attribute"
							v-on="item.event || {}"
						></XlDatePicker>
						<!-- Cascader -->
						<XlCascader
							v-else-if="item.type === 'cascader'"
							v-model:value="state.formData[item.prop]"
							:attr="item.attribute"
							v-on="item.event || {}"
						></XlCascader>
						<!-- Checkbox -->
						<XlCheckbox
							v-else-if="item.type === 'checkbox'"
							v-model:value="state.formData[item.prop]"
							:attr="item.attribute"
							v-on="item.event || {}"
						></XlCheckbox>
						<!-- radio -->
						<XlRadio
							v-else-if="item.type === 'radio'"
							v-model:value="state.formData[item.prop]"
							:attr="item.attribute"
							v-on="item.event || {}"
						></XlRadio>
						<!-- number -->
						<XlInputNumber
							v-else-if="item.type === 'number'"
							v-model:value="state.formData[item.prop]"
							:attr="item.attribute"
							v-on="item.event || {}"
						></XlInputNumber>
						<!-- 输入框文本 -->
						<a-input
							v-else
							v-model:value="state.formData[item.prop]"
							v-bind="{
								allowClear: true,
								placeholder: '请输入',
								...item.attribute
							}"
							v-on="item.event || {}"
						/>
					</a-form-item>
				</a-col>
			</template>
			<a-col v-if="btnLast" v-bind="layout">
				<slot
					name="button"
					:handleSearch="state.handleSearch"
					:handleReset="state.handleReset"
				>
					<a-space>
						<a-button type="primary" @click="state.handleSearch">查询</a-button>
						<a-button @click="state.handleReset">重置</a-button>
					</a-space>
				</slot>
			</a-col>
		</a-row>
		<a-row v-if="!btnLast">
			<a-col :span="24" style="text-align: right">
				<slot
					name="button"
					:handleSearch="state.handleSearch"
					:handleReset="state.handleReset"
				>
					<a-space>
						<a-button type="primary" @click="state.handleSearch">查询</a-button>
						<a-button @click="state.handleReset">重置</a-button>
						<a-button
							v-if="formItem.length > state.colNum"
							type="link"
							@click="state.expand = !state.expand"
						>
							<component :is="state.expand ? 'UpOutlined' : 'DownOutlined'" />
							{{ state.expand ? '收起' : '展开' }}
						</a-button>
					</a-space>
				</slot>
			</a-col>
		</a-row>
	</a-form>
</template>

<script setup lang="ts" name="HeaderSearch">
import type { FormInstance } from 'ant-design-vue'
import XlSelect from '@/components/xl-select/index.vue'
import XlTreeSelect from '@/components/xl-tree-select/index.vue'
import XlDatePicker from '@/components/xl-date-picker/index.vue'
import XlCascader from '@/components/xl-cascader/index.vue'
import XlCheckbox from '@/components/xl-checkbox/index.vue'
import XlRadio from '@/components/xl-radio/index.vue'
import XlInputNumber from '@/components/xl-input-number/NumberSection.vue'

interface FormItemType {
	label?: string
	prop: string
	type?: string
	attribute?: any
	event?: any
	slotName?: string
}

interface PropsType {
	formData: any
	formItem: Array<FormItemType>
	formAttribute?: any
	layout?: any
	btnLast?: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
	formAttribute: () => {
		return {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		}
	},
	formData: () => {
		return {}
	},
	formItem: () => {
		return []
	},
	layout: () => {
		return {
			xs: 24,
			sm: 12,
			md: 8,
			lg: 8,
			xl: 6,
			xxl: 6
		}
	},
	btnLast: false
})

const emit = defineEmits(['search'])

const state = reactive({
	formRef: ref(),
	//存储初始参数
	initForm: { ...props.formData },
	//表单参数
	formData: { ...props.formData },
	//是否展开
	expand: false,
	//计算出一行多少个元素
	colNum: 0,
	getRowCol: () => {
		const width = document.documentElement.offsetWidth
		if (width < 576) state.colNum = 4
		if (width >= 576 && width < 768) state.colNum = 6
		if (width >= 768 && width < 992) state.colNum = 9
		if (width >= 992 && width < 1200) state.colNum = 9
		if (width >= 1200 && width < 1600) state.colNum = 8
		if (width >= 1600) state.colNum = 8
	},
	//搜索表单
	handleSearch() {
		state.formRef
			.validate()
			.then((params: any) => {
				emit('search', params)
			})
			.catch(err => err)
	},
	//重置表单
	handleReset() {
		state.formData = { ...state.initForm }
		state.handleSearch()
	}
})

onMounted(() => {
	state.getRowCol()
	window.addEventListener('resize', state.getRowCol)
})

onUnmounted(() => {
	window.removeEventListener('resize', state.getRowCol)
})
</script>
