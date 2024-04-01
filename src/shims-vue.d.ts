import { ComponentCustomProperties } from 'vue'
import type { Dayjs, ConfigType } from 'dayjs'
import type { Big, BigSource } from 'big.js'

declare module 'dayjs/esm/locale/zh-cn.js'

declare module 'vue' {
	interface ComponentCustomProperties {
		$api: any
		$dayjs(T: ConfigType): Dayjs
		$Big(T: BigSource): Big
	}
}

export default ComponentCustomProperties
