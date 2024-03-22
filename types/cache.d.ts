export interface config {
	autoFocusButton: null | string //指定自动获得焦点的按钮	null|string: ok cancel	ok
	cancelText: string //取消按钮文字	string	取消
	centered: boolean //垂直居中展示 Modal	Boolean	false
	closable: boolean //是否显示右上角的关闭按钮	boolean	false
	//class: string	//容器类名	string	-
	content: string | VNode //内容	string |vNode |function(h)	无
	//icon:	string | VNode//	自定义图标（1.14.0 新增）	string|()=>VNode	<Icon type="question-circle">
	iconType: string //	图标类型（1.14.0 后废弃，请使用 icon）	string	question-circle
	mask: boolean //	是否展示遮罩	Boolean	true
	maskClosable: boolean //	点击蒙层是否允许关闭	Boolean	false
	keyboard: boolean //	是否支持键盘 esc 关闭	boolean	true
	okText: string //	确认按钮文字	string	确定
	okType: string //	确认按钮类型	string	primary
	okButtonProps: any //	ok 按钮 props	ButtonProps	-
	cancelButtonProps: any //	cancel 按钮 props	ButtonProps	-
	title: string //	标题	string|vNode |function(h)	无
	width: string | number //	宽度	string|number	416
	zIndex: number //	设置 Modal 的 z-index	Number	1000
	//onCancel(): void	//	取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭	function	无
	//onOk(): void	//	点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭	function	无
	parentContext: any //	弹窗的父级上下文，一般用于获取父级 provider， 如获取 ConfigProvider 的配置	vue instance
}

export interface ModalOptions {
	/**
	 * Specify which button to autofocus
	 * @default 'ok'
	 * @type string | null
	 */
	autoFocusButton?: string | null

	/**
	 * Text of the Cancel button
	 * @default 'cancel'
	 * @type string
	 */
	cancelText?: string

	/**
	 * Centered Modal
	 * @default false
	 * @type boolean
	 */
	centered?: boolean

	/**
	 * class of container
	 * @type string
	 */
	class?: string

	/**
	 * Modal content
	 * @type string | VNode | (h) => VNode
	 */
	content?: any

	/**
	 * Icon type of the Icon component
	 * @default 'question-circle'
	 * @type string
	 */
	iconType?: string

	icon?: string | Function

	mask?: boolean

	/**
	 * Whether support press esc to close
	 * @default true
	 * @type boolean
	 */
	keyboard?: boolean

	/**
	 * Whether to close the modal dialog when the mask (area outside the modal) is clicked
	 * @default false
	 * @type boolean
	 */
	maskClosable?: boolean

	/**
	 * Text of the OK button
	 * @default 'OK'
	 * @type string
	 */
	okText?: string

	/**
	 * Button type of the OK button
	 * @default 'primary'
	 * @type string
	 */
	okType?: string

	/**
	 * The ok button props
	 * @type object
	 */
	okButtonProps?: Record<string, any>

	/**
	 * The cancel button props
	 * @type object
	 */
	cancelButtonProps?: Record<string, any>

	/**
	 * 标题
	 * @type string | VNode | (h) => VNode
	 */
	title?: any

	/**
	 * Width of the modal dialog
	 * @default 416
	 * @type string | number
	 */
	width?: string | number

	/**
	 * The z-index of the Modal
	 * @default 100
	 * @type number
	 */
	zIndex?: number

	dialogStyle?: object
	dialogClass?: string

	/**
	 * Specify a function that will be called when the user clicks the Cancel button.
	 * The parameter of this function is a function whose execution should include closing the dialog.
	 * You can also just return a promise and when the promise is resolved, the modal dialog will also be closed
	 * @type Function
	 */
	onCancel?: () => any

	/**
	 * Specify a function that will be called when the user clicks the OK button.
	 * The parameter of this function is a function whose execution should include closing the dialog.
	 * You can also just return a promise and when the promise is resolved, the modal dialog will also be closed
	 * @type Function
	 */
	onOk?: () => any

	parentContext?: object
}

export interface ModalConfirm {
	/**
	 * 更新参数
	 * @param modalOptions modal option
	 */
	update(modalOptions: ModalOptions): void

	/**
	 * Destroy the current model instace
	 */
	destroy(): void
}

interface model {
	$info: (modalOptios: ModalOptions) => ModalConfirm
	$success: (modalOptios: ModalOptions) => ModalConfirm
	$error: (modalOptios: ModalOptions) => ModalConfirm
	$warning: (modalOptios: ModalOptions) => ModalConfirm
	$confirm: (modalOptios: ModalOptions) => ModalConfirm
}
