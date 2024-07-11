<template>
	<a-flex justify="center" align="center" gap="small">
		<input
			type="file"
			:ref="el => (state.fileRef = el)"
			@change="state.handleUpload"
		/>
		<a-button
			@click="state.handleStartUpload"
			:disabled="state.fileChunkList.length === 0"
		>
			开始上传
		</a-button>
	</a-flex>
	<a-progress :percent="state.progress + state.mergeState" />
</template>

<script setup lang="ts" name="ShardingUpload">
//https://blog.csdn.net/m0_64130892/article/details/134089516
import SparkMD5 from 'spark-md5'
import { getMergeFile, shardingUpload } from '@/api/upload'

const state = reactive({
	fileRef: ref(),
	fileHash: '', //文件hash值
	fileChunkList: [] as Array<any>, //文件分片列表
	progress: 0, //上传进度
	mergeState: -1, //是否合并成功,-1未合并,0已合并成功
	requireNum: 0, //失败请求次数
	// 计算文件内容hash值
	calculateHash: (file: File): Promise<string> => {
		return new Promise(resolve => {
			const fileReader = new FileReader()
			fileReader.readAsArrayBuffer(file)
			fileReader.onload = function (e) {
				const spark = new SparkMD5.ArrayBuffer()
				spark.append((e.target as FileReader).result as ArrayBuffer)
				resolve(spark.end())
			}
		})
	},
	//上传
	handleUpload: async (e: Event) => {
		state.mergeState = -1
		state.fileChunkList = []
		state.fileHash = ''
		const file = (e.target as HTMLInputElement).files?.[0]
		if (file) {
			state.fileHash = await state.calculateHash(file)
			state.fileChunkList = state.createChunks(file)
		}
	},
	/**
	 * 创建文件分并生成表单并且包装成Promise
	 * @param file 文件对像
	 * @param CHUNK_SIZE 分片大小 2M
	 */
	createChunks: (file: File, CHUNK_SIZE: number = 1024 * 1024 * 2) => {
		let start = 0
		let index = 0
		const chunks: Array<any> = []
		while (start < file.size) {
			let formData = new FormData()
			let hashIndex = state.fileHash + '_' + String(index)
			formData.append('fileName', file.name)
			formData.append('hash', state.fileHash)
			formData.append('hashIndex', hashIndex)
			formData.append('file', file.slice(start, start + CHUNK_SIZE))
			const promise = () => shardingUpload(formData)
			chunks.push({ index: hashIndex, promise })
			start += CHUNK_SIZE
			index++
		}
		return chunks
	},
	handleStartUpload: async () => {
		//请示后端是否上传过文件
		const existingArr = await state.handleVerifyFile()
		const fileChunkList = state.fileChunkList.filter(
			o => !existingArr.includes(o.index)
		)
		const result: any[] = await state.promisePool<string, string>(
			fileChunkList,
			5
		)
		const success = result.filter(item => item.code === 200)
		if (success.length === fileChunkList.length) {
			state.mergeFile(state.fileChunkList.length)
		} else if (state.requireNum < 5) {
			state.requireNum++
			state.handleStartUpload()
		}
		if (state.requireNum >= 5) {
			state.mergeState = -1
			state.fileChunkList = []
			state.fileHash = ''
			console.log('尝试五次仍未上传成功')
		}
	},
	/**
	 * 合并文件
	 * @param fileNumber 分片总数
	 * @param fileName 保存的文件名
	 */
	mergeFile: async (fileNumber: number) => {
		const { code } = await getMergeFile({
			fileNumber,
			md5: state.fileHash
		})
		if (code === 200) {
			state.mergeState = 0
			state.fileChunkList = []
			state.fileHash = ''
			state.fileRef.value = ''
			console.log('上传成功')
		}
	},
	/**Promise并发池，当有大量promise并发时，可以通过这个来限制并发数量
	 * @param taskList 任务列表
	 * @param max 最大并发数量
	 * @return 返回每个promise的结果，顺序和任务列表相同。 目前是成功和失败都会放入该结果
	 * @template T 泛型T会自动填写，是promise成功的结果
	 * @template Err 此泛型是promise错误的结果 （因为 成功和失败都会放入res，所以加个泛型可以便于ts判断）
	 */
	promisePool: <T, Err>(
		taskList: (() => Promise<T>)[],
		max: number
	): Promise<Array<T | Err>> => {
		return new Promise<Array<T | Err>>((resolve: any, reject: any) => {
			try {
				type resType = T | Err
				const length = taskList.length
				const pool: Promise<resType>[] = [] //并发池
				let count = 0 //当前结束了几个
				const res = new Array<resType>(length)
				const forLoop = async () => {
					for (let i = 0; i < length; i++) {
						let task = taskList[i]['promise']()
						//成功和失败都要执行的函数
						const handler = (_res: resType) => {
							pool.splice(pool.indexOf(task), 1) //每当并发池跑完一个任务,从并发池删除个任务
							res[i] = _res //放入结果数组
							count++
							state.progress = Number((count / length).toFixed(2)) * 100
							if (count === length) {
								resolve(res)
							}
						}

						task.then(
							data => {
								handler(data)
								console.log(`第${taskList[i]['index']}个任务完成，结果为`, data)
							},
							err => {
								handler(err)
								console.log(`第${taskList[i]['index']}个任务失败，原因为`, err)
							}
						)

						pool.push(task)

						if (pool.length === max) {
							//Promise.race：返回最快执行的promise
							//利用Promise.race来看获得哪个任务完成的信号
							//搭配await，一旦发现有任务完成了，就继续for循环，把并发池塞满
							await Promise.race(pool)
						}
					}
				}
				forLoop()
			} catch (error) {
				console.error('promise并发池出错', error)
				reject(error)
			}
		})
	},
	/**
	 * @判断文件是否曾经上传过
	 * 1.如果有上传过返回已上传成功的hash数组序号
	 * 2.没有上传过返回空数组
	 */
	handleVerifyFile: () => {
		return []
	}
})
</script>
