interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_TITLE: string
	readonly VITE_API: string
	readonly VITE_TARGET: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
