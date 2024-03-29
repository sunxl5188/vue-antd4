import { notification } from 'ant-design-vue'
import { NotificationArgsProps } from '@/utils/injectKey'

export default {
	success(config: NotificationArgsProps): void {
		notification.success(config)
	},
	error(config: NotificationArgsProps): void {
		notification.error(config)
	},
	info(config: NotificationArgsProps): void {
		notification.info(config)
	},
	warning(config: NotificationArgsProps): void {
		notification.warning(config)
	},
	warn(config: NotificationArgsProps): void {
		notification.warn(config)
	},
	open(config: NotificationArgsProps): void {
		notification.open(config)
	},
	close(key: string): void {
		notification.close(key)
	},
	destroy(): void {
		notification.destroy()
	}
}
