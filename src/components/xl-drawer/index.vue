<template>
	<a-drawer v-model:open="state.visible" v-bind="attribute" v-on="onEvents">
		<slot>--插槽内容--</slot>
	</a-drawer>
</template>

<script setup lang="ts" name="Drawer">
interface PropsType {
	visible: boolean
	attr: any
	events: any
}
const props = withDefaults(defineProps<PropsType>(), {
	attr: () => {},
	events: () => {}
})
const state = reactive({
	visible: computed({
		get() {
			return props.visible
		},
		set() {}
	}),
	afterOpenChange: () => {
		console.log('open')
	},
	handleClose: () => {}
})

const attribute = {
	title: '标题',
	placement: 'right',
	...props.attr
}

const onEvents = {
	afterOpenChange: state.afterOpenChange,
	close: state.handleClose,
	...props.events
}
</script>
