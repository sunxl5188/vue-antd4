/// <reference types="vite/client" />

declare const __APP_VERSION__: string
declare const __APP_PREFIX__: string
declare const __IS_ENCRYPT__: string
declare const __SECRET_KEY__: string
declare const __SECRET_VI__: string

declare module '*.vue' {
	import { App, defineComponent } from 'vue'
	const component: ReturnType<typeof defineComponent> & {
		install(app: App): void
	}
	export default component
}
