<template>
	<a-config-provider :locale="locale" component-size="large">
		<router-view />
	</a-config-provider>
</template>
<script setup lang="ts">
import { theme } from 'ant-design-vue'
import locale from 'ant-design-vue/es/locale/zh_CN'
//import cookie from '@/utils/cookies'
import { session } from '@/utils/cache'

//import { useRoute } from 'vue-router'

//const route = useRoute()

const { useToken } = theme
const { token } = useToken()
let themes = ref({ token: {} })

themes.value.token = token

onMounted(() => {
	session.set('a', { aaa: 2222333444 })
	console.log(session.get('a'))
	//cookie.set('aaa', 1111, 10000)
})

/* watch(
	() => route,
	newValue => {
		console.log(newValue.matched[1]?.components?.default.name)
		//console.log('值发生了变更', newValue.matched[1].components?.default.name)
	},
	{ deep: true, immediate: true }
) */
</script>
