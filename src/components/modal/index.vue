<template>
	<a-modal v-bind="props" @ok="handleConfirm" @cancel="handleCancel">
		<slot></slot>
	</a-modal>
</template>

<script setup lang="ts" name="ModalIndex">
interface ModalProps {
	title?: string
	open: boolean
	width?: string
	destroyOnClose?: boolean
	confirmLoading?: boolean
	footer?: string | null
	keyboard?: boolean
	maskClosable?: boolean
	bodyStyle: any
}

const props = withDefaults(defineProps<ModalProps>(), {
	title: '系统提示',
	open: false,
	width: '520px',
	destroyOnClose: true,
	confirmLoading: false,
	keyboard: false,
	maskClosable: false,
	bodyStyle: { padding: '10px 0' }
})

const emit = defineEmits(['update:open', 'confirm', 'cancel'])

//确认
const handleConfirm = (): void => {
	emit('confirm')
}
//取消
const handleCancel = (): void => {
	emit('update:open', false)
	emit('cancel')
}
</script>
