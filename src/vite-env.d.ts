/// <reference types="vite/client" />

declare module 'vue-contextmenu'

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

/* declare module '*.vue' {
	import { App, defineComponent } from 'vue'
	const component: ReturnType<typeof defineComponent> & {
		install(app: App): void
	}
	export default component
} */
