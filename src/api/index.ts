/* export const api: any = {}
const files = import.meta.glob('./*.ts')

Object.keys(files).forEach((fileName: any) => {
	const name = fileName.replace(/\.\/|\.ts/g, '')
	files[fileName]().then((e: any) => (api[name] = e.default))
}) */

import { fetch } from '@/utils/request'

export const loadDict = (api: string, arg = {}) => {
	return new Promise((resolve, reject) => {
		fetch(api, arg)
			.then(({ code, data }) => {
				if (code === 0) resolve(data)
				else reject('访问字典错误')
			})
			.catch(err => reject('访问字典错误' + err))
	})
}
