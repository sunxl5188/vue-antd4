# vue-virtual-scroller

[![npm](https://img.shields.io/npm/v/vue-virtual-scroller.svg) ![npm](https://img.shields.io/npm/dm/vue-virtual-scroller.svg)](https://www.npmjs.com/package/vue-virtual-scroller)
[![vue3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)

Blazing fast scrolling of any amount of data | [Live demo](https://vue-virtual-scroller-demo.netlify.app/) | [Video demo](https://www.youtube.com/watch?v=Uzq1KQV8f4k)

For Vue 2 support, see [here](https://github.com/Akryum/vue-virtual-scroller/tree/v1/packages/vue-virtual-scroller)

[💚️ Become a Sponsor](https://github.com/sponsors/Akryum)

# 安装

```
npm install --save vue-virtual-scroller@next
```

```
yarn add vue-virtual-scroller@next
```

## 默认导入

Install all the components:

```javascript
import VueVirtualScroller from 'vue-virtual-scroller'

app.use(VueVirtualScroller)
```

Use specific components:

```javascript
import { RecycleScroller } from 'vue-virtual-scroller'

app.component('RecycleScroller', RecycleScroller)
```

**导入包时应包含以下行**

```js
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
```

## 浏览器

```html
<link
	rel="stylesheet"
	href="vue-virtual-scroller/dist/vue-virtual-scroller.css"
/>

<script src="vue.js"></script>
<script src="vue-virtual-scroller/dist/vue-virtual-scroller.min.js"></script>
```

安装组件:

```javascript
app.use(VueVirtualScroller)
```

或者使用自定义名称注册它

```javascript
app.component('RecycleScroller', VueVirtualScroller.RecycleScroller)
```

# 用法

以下机构提供了几个组件 `vue-virtual-scroller`:

[RecycleScroller](#recyclescroller) 是一个组件，它只呈现列表中的可见项。它还重用组件和 dom 元素，以尽可能高效和高性能.

[DynamicScroller](#dynamicscroller) 是一个组件，用于包装 RecycleScroller 组件并扩展其功能以包括动态大小管理。这方面的主要用例是当您事先不知道物品的大小时。动态滚动器在滚动过程中呈现新项目时会自动“发现”项目尺寸.

[DynamicScrollerItem](#dynamicscrolleritem) 必须将每个项目包装在 DynamicScroller 中，以处理大小计算.

[IdState](#idstate) 是一个 mixin，可简化 RecycleScroller 中重用组件的本地状态管理.

## RecycleScroller

是一个虚拟滚动器，仅呈现可见项。当用户滚动时，RecycleScroller 会重用所有组件和 DOM 节点以保持最佳性能.

### 基本用法

使用作用域内的槽呈现列表中的每个项目:

```html
<template>
	<RecycleScroller
		class="scroller"
		:items="list"
		:item-size="32"
		key-field="id"
		v-slot="{ item }"
	>
		<div class="user">{{ item.name }}</div>
	</RecycleScroller>
</template>

<script>
	export default {
		props: {
			list: Array
		}
	}
</script>

<style scoped>
	.scroller {
		height: 100%;
	}

	.user {
		height: 32%;
		padding: 0 12px;
		display: flex;
		align-items: center;
	}
</style>
```

### 重要提示

- **⚠️ 您需要设置 virtual-scroller 元素和 items 元素的大小（例如，使用 CSS）。除非您使用的是可变尺寸模式，否则所有项目都应具有相同的高度（或水平模式下的宽度），以防止显示故障.**
- **⚠️ 如果项目是对象，则滚动条需要能够识别它们。默认情况下，它将查找项目上的字段。如果您使用其他字段名称，则可以使用 prop 进行配置。id keyField**
- 不建议在 RecycleScroller 中使用功能组件，因为这些组件是重用的（因此实际上会更慢）.
- 列表项组件必须对正在更新的道具做出反应，而无需重新创建（使用计算的道具或观察程序对道具更改做出正确反应！item.
- 您不需要设置列表内容（但您应该设置所有嵌套元素以防止加载故障）。key<img>.
- 浏览器对 DOM 元素有大小限制，这意味着目前虚拟滚动条不能显示超过 ~500k 的项目，具体取决于浏览器.
- 由于 DOM 元素是重用到项的，因此建议使用提供的类而不是状态选择器来定义悬停样式（例如 或 ）。hover:hover.vue-recycle-scroller\_\_item-view.hover.hover .some-element-inside-the-item-view

### 它是如何工作的?

- RecycleScroller 创建视图池以向用户呈现可见项。
- 视图包含呈现的项，并在其池中重用。
- 对于每种类型的项目，都会创建一个新池，以便将相同的组件（和 DOM 树）重用于同一类型。
- 如果视图不在屏幕外，则可以停用视图，并且可以随时对新可见的项目重复使用。

以下是 RecycleScroller 的内部结构在垂直模式下的外观

```html
<RecycleScroller>
	<!-- Wrapper element with a pre-calculated total height -->
	<wrapper :style="{ height: computedTotalHeight + 'px' }">
		<!-- Each view is translated to the computed position -->
		<view
			v-for="view of pool"
			:style="{ transform: 'translateY(' + view.computedTop + 'px)' }"
		>
			<!-- Your elements will be rendered here -->
			<slot :item="view.item" :index="view.nr.index" :active="view.nr.used" />
		</view>
	</wrapper>
</RecycleScroller>
```

When the user scrolls inside RecycleScroller, the views are mostly just moved around to fill the new visible space, and the default slot properties updated. That way we get the minimum amount of components/elements creation and destruction and we use the full power of Vue virtual-dom diff algorithm to optimize DOM operations!

### Props

- items：要在滚动条中显示的项目列表
- direction（默认值：）：滚动方向，或 。'vertical''vertical''horizontal'
- itemSize（默认值：）：以像素为单位显示项目的高度（或水平模式下的宽度），用于计算滚动大小和位置。如果设置为（默认值），它将使用可变大小模式。null null
- gridItems：在同一行上显示多个项目以创建网格。您必须输入一个值才能使用此 prop（不支持动态大小）。itemSize
- itemSecondarySize：设置时网格中项目的大小（垂直模式下的宽度，水平模式下的高度）。如果未设置，它将使用 的值。gridItems itemSecondarySize itemSize
- minItemSize：如果项目的高度（或水平模式下的宽度）未知，则使用的最小尺寸。
- sizeField（默认值：）：用于在可变大小模式下获取项目大小的字段。'size'
- typeField（默认值：）：用于区分列表中不同种类的组件的字段。对于每种不同的类型，将创建一个回收物品池。'type'
- keyField（默认值：）：用于标识项目和优化呈现视图管理的字段。'id'
- pageMode（默认值：）：启用页面模式。false
- prerender（默认值：）：为服务器端渲染 （SSR） 渲染固定数量的项。0
- buffer（默认值：）：要添加到滚动可见区域边缘以开始渲染更远的项目的像素量。200
- emitUpdate（默认值：）：每次更新虚拟滚动条内容时发出一个事件（可能会影响性能）。false'update'
- updateInterval（默认值：）：滚动后检查视图是否有更新的时间间隔（以毫秒为单位）。设置为 时，选中将在下一个动画帧中发生。00
- listClass（默认值：）：添加到项列表包装器的自定义类。''
- itemClass（默认值：）：添加到每个项目的自定义类。''
- listTag（default： ）：要呈现为列表包装器的元素。'div'
- itemTag（default： ）：要呈现为列表项（默认插槽内容的直接父级）的元素。'div'

## 事件

- resize：当滚动条大小发生变化时发出。
- visible：当滚动条认为自己在页面中可见时发出。
- hidden：当滚动条隐藏在页面中时发出。
- update (startIndex, endIndex, visibleStartIndex, visibleEndIndex)：每次更新视图时发出，仅当 prop 为emitUpdate true
- scroll-start：呈现第一项时发出。
- scroll-end：在呈现最后一项时发出。

### 默认作用域插槽道具

- item：在视图中呈现的项目。
- index：反映每个项目在数组中的位置items
- active：视图是否处于活动状态。活动视图被视为可见，并由 定位。非活动视图不被视为可见，并且对用户隐藏。如果视图处于非活动状态，则应跳过任何与渲染相关的计算。RecycleScroller

### 其他插槽

```html
<main>
	<slot name="before"></slot>
	<wrapper>
		<!-- Reused view pools here -->
		<slot name="empty"></slot>
	</wrapper>
	<slot name="after"></slot>
</main>
```

例:

```html
<RecycleScroller class="scroller" :items="list" :item-size="32">
	<template #before> Hey! I'm a message displayed before the items! </template>

	<template v-slot="{ item }">
		<div class="user">{{ item.name }}</div>
	</template>
</RecycleScroller>
```

### 页面模式

页面模式扩展虚拟滚动条，并使用页面视口来计算哪些项目是可见的。这样，您可以在之前或之后具有 HTML 元素（如页眉和页脚）的大页面中使用它。将道具设置为：page-mode true

```html
<header>
	<menu></menu>
</header>

<RecycleScroller page-mode>
	<!-- ... -->
</RecycleScroller>

<footer>Copyright 2017 - Cat</footer>
```

### 可变尺寸模式

**⚠️ 此模式可能会对很多项目造成性能影响。请谨慎使用**

如果 prop 未设置或设置为 ，虚拟滚动器将切换到可变大小模式。然后，您需要在 item 对象上公开一个 number 字段，其大小与 item 元素相同。itemSize null

**⚠️ 您仍然需要使用 CSS 正确设置项目的大小（例如使用类）**

使用 prop（默认为 ）设置滚动条使用的字段以获取每个项目的大小。sizeField 'size'

Example:

```javascript
const items = [
	{
		id: 1,
		label: 'Title',
		size: 64
	},
	{
		id: 2,
		label: 'Foo',
		size: 32
	},
	{
		id: 3,
		label: 'Bar',
		size: 32
	}
]
```

### 缓冲区

您可以在虚拟滚动器上设置道具（以像素为单位），以扩展确定可见项目时考虑的视口。例如，如果设置了 1000 像素的缓冲区，则虚拟滚动器将开始渲染滚动条可见区域底部下方 1000 像素的项目，并将显示区域顶部上方 1000 像素的项目保留在可见区域顶部上方。buffer

默认值为 `200`.

```html
<RecycleScroller :buffer="200" />
```

### 服务器端渲染

道具可以设置为要在虚拟滚动器内的服务器上渲染的项目数 prerender

```html
<RecycleScroller
	:items="items"
	:item-size="42"
	:prerender="10"
></RecycleScroller>
```

## 动态滚动

这就像 RecycleScroller 一样工作，但它可以渲染大小未知的项目

### 基本用法

```html
<template>
	<DynamicScroller :items="items" :min-item-size="54" class="scroller">
		<template v-slot="{ item, index, active }">
			<DynamicScrollerItem
				:item="item"
				:active="active"
				:size-dependencies="[
          item.message,
        ]"
				:data-index="index"
			>
				<div class="avatar">
					<img
						:src="item.avatar"
						:key="item.avatar"
						alt="avatar"
						class="image"
					/>
				</div>
				<div class="text">{{ item.message }}</div>
			</DynamicScrollerItem>
		</template>
	</DynamicScroller>
</template>

<script>
	export default {
		props: {
			items: Array
		}
	}
</script>

<style scoped>
	.scroller {
		height: 100%;
	}
</style>
```

### 重要提示

- minItemSize是项目的初始渲染所必需的。
- DynamicScroller不会自行检测大小变化，但可以在 DynamicScrollerItem 上放置可能影响项目大小的值。size-dependencies
- 您不需要在项目上设置字段。size

### Props

扩展所有 RecycleScroller 道具: props.

- 不建议更改道具，因为所有尺寸管理都是在内部完成的。sizeField.

### 事件

扩展所有 RecycleScroller 事件 events.

### 默认作用域插槽道具

扩展所有 RecycleScroller 作用域的插槽道具.

### 其他插槽

扩展所有 RecycleScroller 其他插槽.

## DynamicScrollerItem

应将所有项包装在 DynamicScroller 中的组件.

### Props

- item（必填）：在滚动条中呈现的项目。
- active（必需）：保持视图在 RecycleScroller 中处于活动状态。将防止不必要的大小重新计算。
- sizeDependencies：可能影响项目大小的值。这个道具将被监视，如果一个值发生变化，将重新计算大小。建议而不是 .watchData
- watchData（默认值：）：深入观察更改以重新计算大小（不推荐，可能会影响性能）。false item
- tag（默认值：）：用于呈现组件的元素。'div'
- emitResize（默认值：）：每次重新计算大小时都会发出事件（可能会影响性能）。false resize

### Events

- `resize`: 每次重新计算大小时发出，仅当 prop 为 时。emitResize true.

## IdState

这是方便的 mixin，可以替换在 RecycleScroller 中呈现的组件。data

### 为什么这很有用

由于 RecycleScroller 中的组件是重用的，因此您不能直接使用 Vue 标准属性：否则它们将与列表中的不同项目共享！data

IdState 将提供一个等效于 的对象，但它链接到具有标识符的单个项目（您可以使用 param 更改哪个字段）。idState$dataidProp

### Example

在此示例中，我们使用 的 to 对项目具有“作用域”状态：id item

```html
<template>
	<div class="question">
		<p>{{ item.question }}</p>
		<button @click="idState.replyOpen = !idState.replyOpen">Reply</button>
		<textarea
			v-if="idState.replyOpen"
			v-model="idState.replyText"
			placeholder="Type your reply"
		/>
	</div>
</template>

<script>
	import { IdState } from 'vue-virtual-scroller'

	export default {
		mixins: [
			IdState({
				// You can customize this
				idProp: vm => vm.item.id
			})
		],

		props: {
			// Item in the list
			item: Object
		},

		// This replaces data () { ... }
		idState() {
			return {
				replyOpen: false,
				replyText: ''
			}
		}
	}
</script>
```

### 参数

- idProp（default： ）：组件上的字段名称（例如：）或返回 ID 的函数。vm => vm.item.id'id'

---

## License

[MIT](http://opensource.org/licenses/MIT)
