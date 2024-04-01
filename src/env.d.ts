import 'vue-router'
interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_PREFIX: string
	readonly VITE_API: string
	readonly VITE_TARGET: string
	readonly VITE_TARGET: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare module 'vue-router' {
	interface RouteMeta {
		noCache?: boolean
		title?: string
		icon?: string
		breadcrumb?: boolean
		activeMenu?: string
		hidden?: boolean
	}

	interface _RouteRecordBase {
		hidden?: boolean
		permissions?: string[]
		roles?: string[]
	}
}
