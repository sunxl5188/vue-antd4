import { createApp } from 'vue'
import './assets/style/style.less'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import 'virtual:svg-icons-register'
import SvgIcon from './components/icons/SvgIcon.vue'
import modal from './utils/modal'
import message from '@/utils/message'
import { ModalKey, MessageKey } from '@/utils/injectKey'

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState())

// 注册全局组件
app.component('SvgIcon', SvgIcon)

//注入全局
app.provide(ModalKey, modal)
app.provide(MessageKey, message)

app.use(router)
app.use(pinia)

app.mount('#app')
