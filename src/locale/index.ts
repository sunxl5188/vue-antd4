import { createI18n } from 'vue-i18n'
import zhCn from './zh-cn.json'
import enUs from './en-us.json'
import { local } from '@/utils/cache'

type MessageSchema = typeof zhCn

// 默认读取本地存储语言设置
const defaultLocale = local.get('locale') || 'zh-CN'

const i18n = createI18n<[MessageSchema], 'en-US' | 'zh-CN'>({
	locale: defaultLocale, //默认中文
	globalInjection: true, // 如果设置true, $t() 函数将注册到全局，实际测试不加好像也能直接使用$t获取到值
	legacy: false,
	messages: {
		'zh-CN': { ...zhCn },
		'en-US': { ...enUs }
	}
})

export default i18n
