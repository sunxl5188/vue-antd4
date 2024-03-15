<template>
	<a-config-provider :locale="locale">
		<router-view />
	</a-config-provider>
</template>
<script setup lang="ts">
import { theme } from 'ant-design-vue'
import locale from 'ant-design-vue/es/locale/zh_CN'
import { getCurrentInstance, ComponentInternalInstance } from 'vue'
//import { useRouter } from 'vue-router'

//const router = useRouter()

const { proxy } = getCurrentInstance() as ComponentInternalInstance

const { useToken } = theme
const { token } = useToken()
let themes = ref({ token: {} })

themes.value.token = token

console.log(proxy?.$api)
</script>
<style scoped></style>
