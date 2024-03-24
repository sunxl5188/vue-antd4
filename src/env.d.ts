interface ImportMetaEnv extends Readonly<Record<string, string>> {
	readonly VITE_PREFIX: string
	readonly VITE_API: string
	readonly VITE_TARGET: string
	readonly VITE_TARGET: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
