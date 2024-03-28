import { message } from 'ant-design-vue'
import type { MessageArgsProps } from 'ant-design-vue'
import { JointContent, ConfigDuration, ConfigOnClose } from '@/utils/injectKey'

export default {
	open: (config: MessageArgsProps) => {
		message.open(config)
	},
	success: (
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	) => {
		message.success(content, duration, onClose)
	},
	error: (
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	) => {
		message.error(content, duration, onClose)
	},
	info: (
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	) => {
		message.info(content, duration, onClose)
	},
	warning: (
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	) => {
		message.warning(content, duration, onClose)
	},
	warn: (
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	) => {
		message.warn(content, duration, onClose)
	},
	loading: (
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	) => {
		message.warn(content, duration, onClose)
	}
}
