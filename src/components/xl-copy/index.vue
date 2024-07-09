<template>
	<div>
		<a-button
			v-if="isSupported"
			type="primary"
			:disabled="copied"
			@click="handleCopyClipboard"
		>
			复制
		</a-button>
		<span v-else>您的浏览器不支持剪贴板</span>
	</div>
</template>

<script setup lang="ts" name="CopyIndex">
import { useClipboard } from '@vueuse/core'
import { message } from 'ant-design-vue'

interface PropsType {
	copyRef: any
	content?: string
}
const props = withDefaults(defineProps<PropsType>(), {
	copyRef: null,
	content: 'textContent' // div内容textContent, innerHTML和文本框内容input
})

const { copy, copied, isSupported } = useClipboard()

const handleCopyClipboard = (): void => {
	let content = ''
	if (props.content === 'input') {
		content = props.copyRef || ''
	} else {
		content = props.copyRef[props.content] || ''
	}
	copy(content)
	message.success('复制成功')
}
</script>
