<template>
	<a-modal
		v-model:open="state.visible"
		v-bind="state.attribute"
		v-on="onEvents"
	>
		<slot></slot>
		<template v-if="footer" #footer>
			<slot
				name="footer"
				:confirm="state.handleConfirm"
				:cancel="state.handleCancel"
			></slot>
		</template>
	</a-modal>
</template>

<script setup lang="ts" name="ModalIndex">
interface ModalProps {
	value: boolean
	attr?: any
	event?: any
	footer?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
	value: false,
	attr: () => {},
	event: () => {},
	footer: false
})

const emit = defineEmits(['update:value', 'confirm', 'cancel'])

const state = reactive({
	visible: computed({
		get: () => props.value,
		set: (val: boolean) => {
			emit('update:value', val)
		}
	}),
	attribute: {
		title: '系统提示',
		width: 520,
		destroyOnClose: true,
		confirmLoading: false,
		keyboard: false,
		maskClosable: false,
		bodyStyle: { padding: '10px 0' },
		...props.attr
	},
	//确认
	handleConfirm: (): void => {
		emit('confirm')
	},
	//取消
	handleCancel: (): void => {
		emit('update:value', false)
		emit('cancel')
	}
})

const onEvents = {
	ok: state.handleConfirm,
	cancel: state.handleCancel,
	...props.event
}
</script>
