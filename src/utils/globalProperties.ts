import { App } from 'vue'
import Big from 'big.js'
import dayjs from '@/utils/dayjs'

export default {
	install(app: App) {
		app.config.globalProperties.$Big = Big
		app.config.globalProperties.$dayjs = dayjs
	}
}
