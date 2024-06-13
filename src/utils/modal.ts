import { Modal } from 'ant-design-vue'
import type { ModalFuncProps } from 'ant-design-vue'

const ModalConfig: ModalFuncProps = {
	title: '系统提示',
	content: '请配置内容',
	keyboard: false,
	closable: true
}

export default {
	/**
	 * 信息提示
	 * @param config Modal配置
	 */
	info: (config?: ModalFuncProps): void => {
		Modal.info({
			...ModalConfig,
			...config
		})
	},
	/**
	 * 成功提示
	 * @param config Modal配置
	 */
	success: (config?: ModalFuncProps): void => {
		Modal.success({
			...ModalConfig,
			...config
		})
	},
	/**
	 * 错误提示
	 * @param message 提示内容
	 * @param config 配置参数
	 */
	error: (message: string | object): void => {
		let opt: ModalFuncProps
		if (Object.prototype.toString.call(message) === '[object String]')
			opt = { ...ModalConfig, ...{ content: message as string } }
		else {
			opt = { ...ModalConfig, ...(message as ModalFuncProps) }
		}
		Modal.error(opt)
	},
	/**
	 * 警告提示
	 * @param config Modal配置
	 */
	warning: (config?: ModalFuncProps): void => {
		Modal.warning({
			...ModalConfig,
			...config
		})
	},
	/**
	 * 确认提示
	 * @param config Modal配置
	 */
	confirm: (config?: ModalFuncProps): void => {
		Modal.confirm({
			...ModalConfig,
			...config
		})
	},
	/**
	 * 更新提示信息
	 * @param config Modal配置
	 */
	update: (config?: ModalFuncProps): void => {
		Modal.update({
			...ModalConfig,
			...config
		})
	},
	/**
	 * 销毁弹出的确认窗
	 */
	destroy: (): void => {
		Modal.destroy()
	},
	/**
	 * 销毁所有弹出的确认窗
	 */
	destroyAll: (): void => {
		Modal.destroyAll()
	}
}
