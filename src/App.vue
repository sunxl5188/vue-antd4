<template>
	<a-config-provider :locale="locale">
		<router-view />
	</a-config-provider>
</template>
<script setup lang="ts">
import { theme } from 'ant-design-vue'
import locale from 'ant-design-vue/es/locale/zh_CN'

import { useRoute } from 'vue-router'

const route = useRoute()

const { useToken } = theme
const { token } = useToken()
let themes = ref({ token: {} })

themes.value.token = token

watch(
	() => route,
	newValue => {
		console.log(newValue.matched[1]?.components?.default.name)
		//console.log('值发生了变更', newValue.matched[1].components?.default.name)
	},
	{ deep: true, immediate: true }
)
</script>
