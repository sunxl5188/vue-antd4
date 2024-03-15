const utilFuns: any = {}
const files = import.meta.glob('./*.ts')
Object.keys(files).forEach(async fileName => {
	const name = fileName.replace(/\.\/|\.ts/g, '')
	files[fileName]().then((e: any) => {
		utilFuns[name] = e.default
	})
})

export default utilFuns

/* const modules = import.meta.glob('./*.ts')

for (const path in modules) {
	modules[path]().then(m => {
		console.log(m, '====')
	})
} */
