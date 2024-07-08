<template>
	<a-form
		:ref="(el: FormInstance) => (state.formRef = el)"
		:model="state.formData"
		autocomplete="off"
		v-bind="formAttribute"
	>
		<a-row :gutter="10" type="flex" justify="start">
			<template v-for="(item, i) in state.formItem" :key="i">
				<a-col
					v-show="i < state.colNum || state.expand"
					:xs="24"
					:sm="12"
					:md="8"
					:lg="8"
					:xl="6"
					:xxl="6"
				>
					<a-form-item :label="item.label" :name="item.prop">
						<!-- 插槽 -->
						<template v-if="item.slotName">
							<slot :name="item.slotName"> --插槽-- </slot>
						</template>
						<!-- 选择框 -->
						<a-select
							v-else-if="item.type === 'select'"
							v-model:value="state.formData[item.prop]"
							v-bind="{
								allowClear: true,
								showSearch: true,
								placeholder: '请选择',
								...item.attribute
							}"
						>
							<a-select-option :value="1">1</a-select-option>
						</a-select>
						<!-- tree-select -->
						<TreeSelect
							v-else-if="item.type === 'treeSelect'"
							v-model:value="state.formData[item.prop]"
							v-bind="{
								allowClear: true,
								showSearch: true,
								placeholder: '请选择',
								...item.attribute
							}"
						></TreeSelect>
						<!-- date-picker rang-->
						<DatePicker
							v-else-if="['date', 'range'].includes(item.type)"
							v-model:value="state.formData[item.prop]"
							:type="item.type"
						></DatePicker>
						<!-- Cascader -->
						<Cascader
							v-else-if="item.type === 'cascader'"
							v-model:value="state.formData[item.prop]"
						></Cascader>
						<!-- Checkbox -->
						<Checkbox
							v-else-if="item.type === 'checkbox'"
							v-model:value="state.formData[item.prop]"
						></Checkbox>
						<!-- radio -->
						<Radio
							v-else-if="item.type === 'radio'"
							v-model:value="state.formData[item.prop]"
						></Radio>
						<!-- 输入框文本 -->
						<a-input
							v-else
							v-model:value="state.formData[item.prop]"
							placeholder=""
							allowClear
							v-bind="{
								allowClear: true,
								placeholder: '请输入',
								...item.attribute
							}"
						/>
					</a-form-item>
				</a-col>
			</template>
		</a-row>
		<a-row>
			<a-col :span="24" style="text-align: right">
				<a-space>
					<a-button type="primary" @click="state.handleSearch">查询</a-button>
					<a-button @click="state.handleReset">重置</a-button>
					<a-button
						v-if="state.formItem.length > state.colNum"
						type="link"
						@click="state.expand = !state.expand"
					>
						<component :is="state.expand ? 'UpOutlined' : 'DownOutlined'" />
						{{ state.expand ? '收起' : '展开' }}
					</a-button>
				</a-space>
			</a-col>
		</a-row>
	</a-form>
</template>

<script setup lang="ts" name="HeaderSearch">
import TreeSelect from '@/components/tree-select/index.vue'
import DatePicker from '@/components/date-picker/index.vue'
import Cascader from '@/components/cascader/index.vue'
import Checkbox from '@/components/checkbox/index.vue'
import Radio from '@/components/radio/index.vue'

interface PropsType {
	formAttribute?: any
}

withDefaults(defineProps<PropsType>(), {
	formAttribute: () => {
		return {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 }
		}
	}
})

interface FormItemType {
	label?: string
	prop: string
	type?: string
	attribute?: any
	events?: any
	slotName?: string
}

const emit = defineEmits(['search'])

const state = reactive({
	formRef: ref(),
	//存储初始参数
	initForm: {},
	//表单参数
	formData: {
		a: undefined,
		b: undefined,
		h: [],
		f: undefined
	},
	//表单元素
	formItem: [
		{
			label: '驿站',
			prop: 'a',
			type: 'select',
			attribute: {},
			events: {}
		},
		{
			label: '负责人',
			prop: 'b',
			attribute: {},
			events: {}
		},
		{
			label: '地区',
			prop: 'c',
			type: 'tree',
			attribute: {},
			events: {}
		},
		{
			label: '状态',
			prop: 'd',
			type: 'checkbox',
			attribute: {},
			events: {}
		},
		{
			label: '服务项目',
			prop: 'e',
			type: 'radio',
			attribute: {},
			events: {}
		},
		{
			label: '自定义',
			prop: 'f',
			type: 'treeSelect',
			attribute: {},
			events: {}
		},
		{
			label: '服务项目',
			prop: 'j',
			type: 'date',
			attribute: {},
			events: {}
		},
		{
			label: '服务项目',
			prop: 'h',
			type: 'range',
			attribute: {},
			events: {}
		},
		{
			label: '服务项目',
			prop: 'i',
			type: 'radio',
			attribute: {},
			events: {}
		},
		{
			label: '服务项目',
			prop: 'j',
			type: 'radio',
			attribute: {},
			events: {}
		},
		{
			label: '服务项目',
			prop: 'k',
			type: 'radio',
			attribute: {},
			events: {}
		},
		{
			label: '服务项目',
			prop: 'l',
			type: 'radio',
			attribute: {},
			events: {}
		}
	] as Array<FormItemType>,
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
