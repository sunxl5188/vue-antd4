import { fetch } from '@/utils/request'

export const getList = () => {
	return new Promise((resolve, reject) => {
		fetch('/home', { id: 1 })
			.then(res => resolve(res.data))
			.catch(err => reject(err))
	})
}
