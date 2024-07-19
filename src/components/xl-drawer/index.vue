<template>
	<a-drawer v-model:open="state.visible" v-bind="attribute" v-on="onEvents">
		<template #extra>
			<CloseOutlined class="text-gray-400 cursor-pointer" />
		</template>
		<slot>--插槽内容--</slot>
	</a-drawer>
</template>

<script setup lang="ts" name="Drawer">
import { CloseOutlined } from '@ant-design/icons-vue'
interface PropsType {
	value: boolean
	attr?: any
	event?: any
}
const props = withDefaults(defineProps<PropsType>(), {
	attr: () => {},
	event: () => {}
})
const emit = defineEmits(['update:value'])
const state = reactive({
	visible: computed({
		get() {
			return props.value
		},
		set(val: boolean) {
			emit('update:value', val)
		}
	}),
	afterOpenChange: () => {
		console.log('open')
	},
	handleClose: () => {}
})

const attribute = {
	title: '标题',
	placement: 'right',
	...props.attr
}

const onEvents = {
	afterOpenChange: state.afterOpenChange,
	close: state.handleClose,
	...props.event
}
</script>
