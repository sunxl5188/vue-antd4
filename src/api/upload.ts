import { fetch, post } from '@/utils/request'

//合并文件
export const getMergeFile = (params: any): Promise<any> => {
	return new Promise((resolve, reject) => {
		fetch('/index/index/mergeFile', params)
			.then((res: any) => {
				if (res.code === 200) resolve(res)
			})
			.catch(err => reject(err))
	})
}
//上传分片文件
export const shardingUpload = (formData: FormData): Promise<any> => {
	return new Promise((resolve, reject) => {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
		post('/index/index/upload', formData, config)
			.then((res: any) => {
				if (res?.code === 200) resolve(res)
				else reject(new Error('上传失败'))
			})
			.catch(err => {
				reject(err)
			})
	})
}
