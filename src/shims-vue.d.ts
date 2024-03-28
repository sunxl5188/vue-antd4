import { ComponentCustomProperties } from 'vue'

declare module 'vue' {
	interface ComponentCustomProperties {
		$api: any
	}
}

export default ComponentCustomProperties
