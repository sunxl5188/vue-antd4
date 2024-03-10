<template>
	<a-config-provider :locale="locale">
		<router-view />
	</a-config-provider>
</template>
<script setup lang="ts">
import { theme } from 'ant-design-vue'
import locale from 'ant-design-vue/es/locale/zh_CN'
//import { useRouter } from 'vue-router'

//const router = useRouter()

const { useToken } = theme
const { token } = useToken()
let themes = ref({ token: {} })

themes.value.token = token
</script>
<style scoped></style>
