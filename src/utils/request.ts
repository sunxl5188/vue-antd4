//https://www.axios-http.cn/docs/intro
//http://www.axios-js.com/zh-cn/docs/#axios-put-url-data-config
import axios, {
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError,
	InternalAxiosRequestConfig,
	AxiosPromise
} from 'axios'
import { message } from 'ant-design-vue'

declare module 'axios' {
	//这里扩展里AxiosError类型
	interface InternalAxiosRequestConfig {
		_count?: number
	}
}

const handleMessage = (content: string): void => {
	message.error(content)
}

/**
 * 请求失败错误码统一处理
 * @param status
 * @param other
 */
const errorHandle = (status: number, other: string): void => {
	// 状态码判断
	switch (status) {
		case 302:
			handleMessage(`${status}:接口重定向了！`)
			break
		case 400:
			handleMessage(
				`${status}:发出的请求有错误，服务器没有进行新建或修改数据的操作`
			)
			break
		// 401: 未登录
		// 未登录则跳转登录页面，并携带当前页面的路径
		// 在登录成功后返回当前页面，这一步需要在登录页操作。
		case 401: //重定向
			handleMessage(`${status}:登录失效`)
			break
		// 403 token过期
		// 清除token并跳转登录页
		case 403:
			handleMessage(`${status}:登录过期,用户得到授权，但是访问是被禁止的`)
			break
		case 404:
			handleMessage(`${status}:网络请求不存在`)
			break
		case 406:
			handleMessage(`${status}:请求的格式不可得`)
			break
		case 408:
			handleMessage(`${status}:请求超时！`)
			break
		case 410:
			handleMessage(`${status}:请求的资源被永久删除，且不会再得到的`)
			break
		case 422:
			handleMessage(`${status}:当创建一个对象时，发生一个验证错误`)
			break
		case 500:
			handleMessage(`${status}:服务器发生错误，请检查服务器`)
			break
		case 502:
			handleMessage(`${status}:网关错误`)
			break
		case 503:
			handleMessage(`${status}:服务不可用，服务器暂时过载或维护`)
			break
		case 504:
			handleMessage(`${status}:网关超时`)
			break
		default:
			handleMessage(`${status}:其他错误错误`)
			console.log(other)
	}
}

interface PendingType {
	url?: string
	method?: string
	params: any
	data: any
	cancel: any
}

const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken

const removePending = (config: AxiosRequestConfig) => {
	for (const key in pending) {
		if (Object.hasOwn(pending, key)) {
			const item: number = +key
			const list: PendingType = pending[key]
			// 当前请求在数组中存在时执行函数体
			if (
				list.url === config.url &&
				list.method === config.method &&
				JSON.stringify(list.params) === JSON.stringify(config.params) &&
				JSON.stringify(list.data) === JSON.stringify(config.data)
			) {
				// 执行取消操作
				list.cancel('操作太频繁，请稍后再试')
				// 从数组中移除记录
				pending.splice(item, 1)
			}
		}
	}
}

/**
 * 实例化配置
 */
const instance = axios.create({
	baseURL: '/api',
	//"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
	headers: {
		'Content-Type': 'application/json;charset=UTF-8' //默认
	},
	timeout: 5000,
	withCredentials: false, // 表明跨域请求是否需要证明
	responseType: 'json', // 'arraybuffer','blob','document','json','text',stream'
	responseEncoding: 'utf8'
})

/**
 * 请求拦截器, 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		removePending(config)
		config.cancelToken = new CancelToken(c => {
			pending.push({
				url: config.url,
				method: config.method,
				params: config.params,
				data: config.data,
				cancel: c
			})
		})
		const token = localStorage.getItem('token') ?? ''
		if (token) {
			config.headers!.Authorization = token
			config.headers!.Token = token
		}
		return config
	},
	error => {
		const err = error.data.error as any
		message.error(err.message)
		return Promise.reject(err.message)
	}
)

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
	function (config: AxiosResponse) {
		// 请求成功
		if (config.status === 200 || config.status === 204) {
			return Promise.resolve(config.data)
		} else {
			return Promise.reject(config)
		}
	}, // 请求失败
	function (error: AxiosError) {
		const { response, config } = error
		if (response) {
			errorHandle(response.status, (response.data as any).message)
			// 超时重新请求
			// 全局的请求次数,请求的间隙
			const [RETRY_COUNT, RETRY_DELAY] = [3, 1000]

			if (config && RETRY_COUNT) {
				// 设置用于跟踪重试计数的变量
				config._count = config._count || 0
				// 检查是否已经把重试的总数用完
				if (config._count >= RETRY_COUNT) {
					return Promise.reject(response ?? { message: error.message })
				}
				// 增加重试计数
				config._count++
				// 创造新的Promise来处理指数后退
				const backoff = new Promise<void>(resolve => {
					setTimeout(() => {
						resolve()
					}, RETRY_DELAY || 1)
				})
				// instance重试请求的Promise
				return backoff.then(() => {
					return instance(config)
				})
			}

			return Promise.reject(response)
		} else {
			// 处理断网的情况
			// eg:请求超时或断网时，更新state的network状态
			// network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
			// 后续增加断网情况下做的一些操作
			//store.commit('setNetwork', false)
		}
	}
)

/**
 * GET
 * @param url API地址
 * @param params 参数
 * @param config axios.config
 * @returns 返回数据
 */
export const fetch = (
	url: string,
	params: object,
	config?: AxiosRequestConfig
): AxiosPromise => {
	return new Promise((resolve, reject) => {
		instance
			.get(url, { ...config, ...params })
			.then(response => resolve(response))
			.catch(error => reject(error))
	})
}

/**
 * POST
 * @param url API地址
 * @param data 能数
 * @param config axios.config
 * @returns 返回数据
 */
export const post = (
	url: string,
	data: object,
	config?: AxiosRequestConfig
): AxiosPromise => {
	return new Promise((resolve, reject) => {
		instance
			.post(url, { ...config, ...{ data } })
			.then(response => resolve(response))
			.catch(error => reject(error))
	})
}

/**
 * PUT~完整的更新资源,修改数据:将所有数据都推送到后端
 * @param url API地址
 * @param params 参数
 * @param config axios.config
 * @returns 返回数据
 */
export const put = (
	url: string,
	params: object,
	config?: AxiosRequestConfig
): AxiosPromise => {
	return new Promise((resolve, reject) => {
		instance
			.put(url, { ...config, ...params })
			.then(response => resolve(response))
			.catch(error => reject(error))
	})
}

/**
 * PATCH~局部更新~修改数据：只将修改的数据推送到后端
 * @param url API地址
 * @param params 参数
 * @param config axios.config
 * @returns 返回数据
 */
export const patch = (
	url: string,
	params: object,
	config?: AxiosRequestConfig
): AxiosPromise => {
	return new Promise((resolve, reject) => {
		instance
			.patch(url, { ...config, ...params })
			.then(response => resolve(response))
			.catch(error => reject(error))
	})
}

/**
 * DELETE 用于删除数据
 * @param url API地址
 * @param params 参数
 * @param config axios.config
 * @returns 返回数据
 */
export const del = (
	url: string,
	params: object,
	config?: AxiosRequestConfig
): AxiosPromise => {
	return new Promise((resolve, reject) => {
		instance
			.delete(url, { ...config, ...params })
			.then(response => resolve(response))
			.catch(error => reject(error))
	})
}

/**
 * REQUEST请求
 * @param config axios.config
 * @returns 返回数据
 */
export const request = (config: AxiosRequestConfig): AxiosPromise => {
	return new Promise((resolve, reject) => {
		instance
			.request(config)
			.then(response => resolve(response))
			.catch(error => reject(error))
	})
}
