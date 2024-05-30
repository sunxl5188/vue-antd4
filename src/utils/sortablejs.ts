import Sortable from 'sortablejs'
/**
 * 用例
 * const el = document.querySelector('.ant-table-tbody') as HTMLElement
	 draggable(el, newData.value, (e: any[]) => {
		 newData.value = e
	 })
 */
/**
 * Sortable拖拽方法
 * @param el 拖拽元素BODY 拖动子元素的父级元素
 * @param dataSource 使用克隆原始数据进行排序
 * @param callback 回调排序好的数据
 * @param config sortablsjs 自定义配置信息
 */
const draggable = (
	el: HTMLElement,
	dataSource: Array<any>,
	callback: (e: any) => void,
	config?: object
): void => {
	new Sortable(el, {
		//一个网页存在多个分组时设置
		//or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
		//group: 'name',
		//是否允许列内部排序，如果为false当有多个排序组时,多个组之间可以拖拽，本身不能拖拽
		sort: true,
		// 按下鼠标后多久可以拖拽 1000表示1秒
		delay: 0,
		//如果为false按下鼠标不动才计算延时，移动则无效
		delayOnTouchOnly: false,
		//当按下鼠标移动了n个像素时会取消延迟delay事件，即可超过了这个范围无法拖动元素了
		//px, how many pixels the point should move before cancelling a delayed drag event
		touchStartThreshold: 0,
		//启用禁用拖拽
		disabled: false,
		//Store
		store: undefined,
		//动画效果
		animation: 500,
		// Easing 动画 默认null. See https://easings.net/ for examples.
		easing: 'cubic-bezier(1, 0, 0, 1)',
		//句柄，点击指定class样式的对象才能拖拽元素
		handle: '.ant-table-row',
		//忽略class为ignore-elements的元素不能拖动,或者通过函数来实现过滤不允许拖动的对象
		// Selectors that do not lead to dragging (String or Function)
		filter: '.ignore-elements',
		//触发filter时调用`event.preventDefault()`
		// Call `event.preventDefault()` when triggered `filter`
		preventOnFilter: true,
		//指定那些元素可以被拖拽
		// Specifies which items inside the element should be draggable
		draggable: '.ant-table-row',
		//指定获取拖动后排序的data属性
		dataIdAttr: 'data-id',
		//停靠位置的自定义样式
		// Class name for the drop placeholder
		ghostClass: 'sortable-ghost',
		//选中元素的自定义样式
		// Class name for the chosen item
		chosenClass: 'sortable-chosen',
		//拖拽时的自定义样式
		// Class name for the dragging item
		dragClass: 'sortable-drag',
		//交互区大小，A元素到B元素内多深的距离触发替换位置
		//Threshold of the swap zone
		swapThreshold: 1,
		// Will always use inverted swap zone if set to true
		invertSwap: false,
		// Threshold of the inverted swap zone (will be set to swapThreshold value by default)
		invertedSwapThreshold: 1,
		//拖拽方向(默认会自动判断方向)
		direction: 'horizontal',
		//忽略HTML5原生拖拽行为
		forceFallback: false,
		//拖拽时被克隆元素的样式名称
		// Class name for the cloned DOM Element when using forceFallback
		fallbackClass: 'sortable-fallback',
		// Appends the cloned DOM Element into the Document's Body
		fallbackOnBody: false,
		// Specify in pixels how far the mouse should move before it's considered as a drag.
		fallbackTolerance: 0,
		dragoverBubble: false,
		// Remove the clone element when it is not showing, rather than just hiding it
		removeCloneOnHide: true,
		// px, distance mouse must be from empty sortable to insert drag element into it
		emptyInsertThreshold: 5,
		setData: function (
			/** DataTransfer */ dataTransfer,
			/** HTMLElement*/ dragEl
		) {
			dataTransfer.setData('Text', (dragEl as any).textContent) // `dataTransfer` object of HTML5 DragEvent
		},
		//点击选中元素事件
		// Element is chosen
		onChoose: function (/**Event*/ evt) {
			evt.oldIndex // element index within parent
		},
		//取消选中事件
		// Element is unchosen
		onUnchoose: function (/**Event*/) {
			// same properties as onEnd
		},
		//开始拖拽事件
		// Element dragging started
		onStart: function (/**Event*/ evt) {
			evt.oldIndex // element index within parent
		},
		//结束拖拽事件
		// Element dragging ended
		onEnd: function ({ newIndex, oldIndex }) {
			if (dataSource) {
				const changeData = dataSource.splice(oldIndex || 0, 1)
				dataSource.splice(newIndex || 0, 0, changeData[0])
				//if (Object.prototype.toString.call(callback) === '[object Function]')
				callback(dataSource)
			}
		},
		// 被拖拽的元素加入到其他列表时的事件
		// Element is dropped into the list from another list
		onAdd: function (/**Event*/) {
			// same properties as onEnd
		},
		//排序发生改变时的事件
		// Changed sorting within list
		onUpdate: function (/**Event*/) {
			// same properties as onEnd
		},
		// Called by any change to the list (add / update / remove)
		onSort: function (/**Event*/) {
			// same properties as onEnd
		},
		// Element is removed from the list into another list
		onRemove: function (/**Event*/) {
			// same properties as onEnd
		},
		// Attempt to drag a filtered element
		onFilter: function (/**Event*/) {
			// HTMLElement receiving the `mousedown|tapstart` event.
		},
		// Event when you move an item in the list or between lists
		onMove: function (/**Event*/ evt, /**Event*/ originalEvent) {
			/*
           evt.dragged; // 被拖拽的对象
           evt.draggedRect; // 被拖拽的对象所在区域 {left, top, right, bottom}
           evt.related; // 被替换的对象
           evt.relatedRect; // DOMRect
           evt.willInsertAfter; // 是在被替换对象的前面还是后面
           originalEvent.clientY; // 鼠标的位置
         */
			evt.dragged // dragged HTMLElement
			evt.draggedRect // DOMRect {left, top, right, bottom}
			evt.related // HTMLElement on which have guided
			evt.relatedRect // DOMRect
			evt.willInsertAfter // Boolean that is true if Sortable will insert drag element after target by default
			originalEvent // mouse position
			// return false; — for cancel
			// return -1; — insert before target
			// return 1; — insert after target
		},
		// Called when creating a clone of element
		onClone: function (/**Event*/) {},
		// Called when dragging element changes position
		onChange: function (/**Event*/ evt) {
			evt.newIndex // most likely why this event is used is to get the dragging element's current index
			// same properties as onEnd
		},
		...config
	})
}

export default draggable
