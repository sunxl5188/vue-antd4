<template>
	<a-mentions
		v-model:value="state.value"
		autofocus
		@select="state.handleSelect"
	>
		<a-mentions-option value="afc163">afc163</a-mentions-option>
		<a-mentions-option value="zombieJ">zombieJ</a-mentions-option>
		<a-mentions-option value="yesmeck">yesmeck</a-mentions-option>
	</a-mentions>
</template>

<script setup lang="ts" name="Mentions">
interface PropsType {
	value: string
	options: Array<any>
	dict: string
}
const props = withDefaults(defineProps<PropsType>(), {
	options: () => [],
	dict: ''
})
const state = reactive({
	value: computed({
		get() {
			return props.value
		},
		set() {}
	}),
	options: computed({
		get() {
			return props.options
		},
		set(val: Array<any>) {
			console.log(val)
		}
	}),
	handleSelect(): void {}
})
</script>
