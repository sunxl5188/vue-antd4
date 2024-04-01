import { createI18n } from 'vue-i18n'
import type { VueI18nOptions } from 'vue-i18n'
import zhCn from './zh-cn'
import enUs from './en-us'
import { local } from '@/utils/cache'

// 默认读取本地存储语言设置
const defaultLocale = local.get('locale') || 'zh-CN'
const i18n = createI18n<VueI18nOptions>({
	locale: defaultLocale, //默认中文
	globalInjection: true, // 如果设置true, $t() 函数将注册到全局，实际测试不加好像也能直接使用$t获取到值
	legacy: false,
	messages: {
		...zhCn,
		...enUs
	}
})

export default i18n
