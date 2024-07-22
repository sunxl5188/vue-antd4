import { fetch } from '@/utils/request'

/**
 * 获取字典
 * @param api 字典地址
 * @returns 枚举数组
 */
export const loadDict = (api: string): Promise<any[]> => {
	return new Promise((resolve, reject) => {
		fetch(api)
			.then(({ code, data }) => {
				if (code === 200) resolve(data)
				else resolve([])
			})
			.catch(err => reject(new Error('访问字典错误' + err)))
	})
}
