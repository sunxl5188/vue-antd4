import { fetch } from '@/utils/request'

export const getList = () => {
	return new Promise((resolve, reject) => {
		fetch('/index/system/index/code/2', {})
			.then(res => resolve(res.data))
			.catch(err => reject(err))
	})
}
