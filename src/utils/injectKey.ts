import type { ModalFuncProps, MessageArgsProps } from 'ant-design-vue'
import type { LoDashStatic } from 'lodash'
import { Dayjs, ConfigType } from 'dayjs'
declare type VNodeChildAtom =
	| VNode
	| string
	| number
	| boolean
	| null
	| undefined
	| void
export type VueNode = VNodeChildAtom | VNodeChildAtom[] | VNode

//======modal=================================================

export interface ModalType {
	/**
	 * 信息提示
	 * @param config Modal配置
	 */
	info(config?: ModalFuncProps): void
	/**
	 * 成功提示
	 * @param config Modal配置
	 */
	success(config?: ModalFuncProps): void
	/**
	 * 错误提示
	 * @param config Modal配置
	 */
	error(config?: ModalFuncProps): void
	/**
	 * 警告提示
	 * @param config Modal配置
	 */
	warning(config?: ModalFuncProps): void
	/**
	 * 确认提示
	 * @param config Modal配置
	 */
	confirm(config?: ModalFuncProps): void
	/**
	 * 更新提示信息
	 * @param config Modal配置
	 */
	update(config?: ModalFuncProps): void
	/**
	 * 销毁弹出的确认窗
	 */
	destroy: () => void
	/**
	 * 销毁所有弹出的确认窗
	 */
	destroyAll: () => void
}

export const ModalKey = Symbol() as InjectionKey<ModalType>

//=======message=================================================
export type JointContent = string | MessageArgsProps
export type ConfigDuration = number | undefined
export type ConfigOnClose = () => void

export interface MessageType {
	/**
	 * 信息提示
	 * @param config Message配置信息
	 */
	open(config: MessageArgsProps): void
	/**
	 * 成功信息提示
	 * @param config Message配置信息
	 */
	success(
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	): void
	/**
	 * 错误信息提示
	 * @param config Message配置信息
	 */
	error(
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	): void
	/**
	 * Info信息提示
	 * @param config Message配置信息
	 */
	info(
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	): void
	/**
	 * 警告信息提示
	 * @param config Message配置信息
	 */
	warning(
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	): void
	/**
	 * 警告信息提示 as warning别名
	 * @param config Message配置信息
	 */
	warn(
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	): void
	/**
	 * 加载提示
	 * @param config Message配置信息
	 */
	loading(
		content: JointContent,
		duration?: ConfigDuration,
		onClose?: ConfigOnClose
	): void
}

export const MessageKey = Symbol() as InjectionKey<MessageType>

//========notification======================================================
export type NotificationPlacement =
	| 'top'
	| 'topLeft'
	| 'topRight'
	| 'bottom'
	| 'bottomLeft'
	| 'bottomRight'
export type IconType = 'success' | 'info' | 'error' | 'warning'
export interface CSSProperties {
	[key: string]: string | number
}

export interface NotificationArgsProps {
	message: VueNode | (() => VueNode)
	description?: VueNode | (() => VueNode)
	btn?: VueNode | (() => VueNode)
	key?: string
	onClose?: () => void
	duration?: number | null
	icon?: VueNode | (() => VueNode)
	placement?: NotificationPlacement
	maxCount?: number
	style?: CSSProperties
	prefixCls?: string
	class?: string
	readonly type?: IconType
	onClick?: () => void
	top?: string | number
	bottom?: string | number
	getContainer?: () => HTMLElement
	closeIcon?: VueNode | (() => VueNode)
	appContext?: any
}

export interface NotificationType {
	/**
	 * 成功提示
	 * @param config Notification 配置参数
	 */
	success(config: NotificationArgsProps): void
	/**
	 * 错误提示
	 * @param config Notification 配置参数
	 */
	error(config: NotificationArgsProps): void
	/**
	 * 信息提示
	 * @param config Notification 配置参数
	 */
	info(config: NotificationArgsProps): void
	/**
	 * 警告提示
	 * @param config Notification 配置参数
	 */
	warning(config: NotificationArgsProps): void
	/**
	 * 警告提示 warning别名
	 * @param config Notification 配置参数
	 */
	warn(config: NotificationArgsProps): void
	/**
	 * Notification-open提示
	 * @param config Notification 配置参数
	 */
	open(config: NotificationArgsProps): void
	/**
	 * Notification-关闭
	 */
	close(key: string): void
	/**
	 * Notification-销毁
	 */
	destroy(): void
}

export const NotificationKey = Symbol() as InjectionKey<NotificationType>

//==========lodash================================================================
export const LodashKey = Symbol() as InjectionKey<LoDashStatic>

//==========Dayjs================================================================

export type DayjsType = (T?: ConfigType) => Dayjs

export const DayjsKey: InjectionKey<DayjsType> = Symbol('')
