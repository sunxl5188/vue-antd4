import { createApp } from 'vue'
import './assets/style/style.less'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import 'virtual:svg-icons-register'
import SvgIcon from './components/icons/SvgIcon.vue'
import i18n from './i18n'
import modal from './utils/modal'
import message from '@/utils/message'
import notification from '@/utils/notification'
import lodash from 'lodash'
import dayjs from '@/utils/dayjs'
import {
	ModalKey,
	MessageKey,
	NotificationKey,
	LodashKey,
	DayjsKey
} from '@/utils/injectKey'
import global from '@/utils/globalProperties'
import * as aIcon from '@ant-design/icons-vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState())

// 注册全局组件
app.component('SvgIcon', SvgIcon)
Object.keys(aIcon).forEach((key: any) => {
	app.component(key, aIcon[key as keyof typeof aIcon])
})

//注入全局
app.provide(ModalKey, modal)
app.provide(MessageKey, message)
app.provide(NotificationKey, notification)
app.provide(LodashKey, lodash)
app.provide(DayjsKey, dayjs)
app.provide('aIcon', aIcon)
app.use(i18n)
app.use(global)
app.use(router)
app.use(pinia)

app.mount('#app')
