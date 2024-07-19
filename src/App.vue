<template>
	<a-config-provider
		:locale="locale"
		component-size="large"
		:transformCellText="transformCellText"
	>
		<router-view />
	</a-config-provider>
</template>
<script setup lang="ts">
import { theme } from 'ant-design-vue'
import locale from 'ant-design-vue/es/locale/zh_CN'
import { useRouter } from 'vue-router'

const { useToken } = theme
const { token } = useToken()
let themes = ref({ token: {} })

themes.value.token = token

const transformCellText = ({ text }): void => {
	return typeof text === 'object' || text?.length
		? text
		: h('span', { class: 'text-gray-400' }, '--')
}

const route = useRouter()
onMounted(() => {
	console.log(route.getRoutes())
})

watch(
	() => route,
	newValue => {
		console.log('值发生了变更', newValue)
	},
	{ deep: true, immediate: true }
)
</script>
