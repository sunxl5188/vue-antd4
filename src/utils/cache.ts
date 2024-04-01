import dayjs from '@/utils/dayjs'
import { encryptData, decryptData } from './cryptojs'

const prefix = __APP_PREFIX__ + '-' + __APP_VERSION__ + '-'

type TimeType = string | number | Date | undefined

/**
 * 设置缓存时间,返回时间戳
 * @param {*} time
 */
const getExpireTimes = (time: TimeType) => {
	let _expires = dayjs().add(1, 'day').valueOf() // 默认一天时间
	if (time) {
		const reg = /^(\d+)(?:[ymdh])$/i
		const expireTime = time.toString().replace(reg, '$1')
		switch (time.constructor) {
			case Number:
				_expires = dayjs().add(Number(time), 'second').valueOf()
				break
			case String:
				if (/^(?:\d+([ymdh]))$/i.test(time.toString())) {
					// get capture type group , to lower case
					const type = time
						.toString()
						.replace(/^(?:\d+)([ymdh])$/i, '$1')
						.toLowerCase()
					switch (type) {
						// Frequency sorting
						case 'm': //月
							_expires = dayjs().add(Number(expireTime), 'month').valueOf()
							break
						case 'd': //天
							_expires = dayjs().add(Number(expireTime), 'day').valueOf()
							break
						case 'h': //小时
							_expires = dayjs().add(Number(expireTime), 'hour').valueOf()
							break
						case 'y': //年
							_expires = dayjs().add(Number(expireTime), 'year').valueOf()
							break
						default:
							console.error('设置未知异常')
					}
				} else {
					_expires = dayjs().add(Number(expireTime), 'second').valueOf()
				}
				break
			case Date:
				_expires = dayjs((time as Date).toUTCString()).valueOf()
				break
			default:
				_expires = dayjs().add(1, 'day').valueOf() // 默认一天时间
		}
	}
	return _expires
}

/**
 * localStorage缓存
 */
export const local = {
	/**
	 * 设置localStorage缓存
	 * @param key localStorage名
	 * @param value localStorage 值
	 * @param expire 过期时间
	 * @returns
	 */
	set(key: string, value: any, expire?: TimeType): void {
		if (!localStorage) {
			return
		}
		if (key !== null && value !== null) {
			const data = {
				value: __IS_ENCRYPT__
					? encryptData(value, __SECRET_KEY__, __SECRET_VI__)
					: JSON.stringify(value),
				expire: getExpireTimes(expire)
			}
			localStorage.setItem(prefix + key, JSON.stringify(data))
		}
	},
	/**
	 * 获取localStorage值
	 * @param key localStorage名
	 * @returns localStorage 值
	 */
	get(key: string): string {
		let value = ''
		if (key && localStorage) {
			let data: any = localStorage.getItem(prefix + key)
			if (data !== null) {
				data = JSON.parse(data)
				if (data.expire === 0) {
					value = data.value
				} else if (data.expire < Date.now()) {
					this.remove(key)
				} else {
					value = data.value
				}
				if (__IS_ENCRYPT__) {
					value = decryptData(value, __SECRET_KEY__, __SECRET_VI__)
				}
			}
		}
		return value === '' ? '' : JSON.parse(value)
	},
	/**
	 * 删除localStorage
	 * @param key localStorage名
	 */
	remove(key: string) {
		localStorage.removeItem(prefix + key)
	}
}

/**
 * sessionStorage缓存
 */
export const session = {
	/**
	 * 设置sessionStorage
	 * @param key sessionStorage名
	 * @param value sessionStorage值
	 * @param expire 过期时间
	 * @returns void
	 */
	set(key: string, value: any, expire?: TimeType) {
		if (!sessionStorage) {
			return
		}
		if (key !== null && value !== null) {
			const data = {
				value: __IS_ENCRYPT__
					? encryptData(value, __SECRET_KEY__, __SECRET_VI__)
					: JSON.stringify(value),
				expire: getExpireTimes(expire)
			}
			sessionStorage.setItem(prefix + key, JSON.stringify(data))
		}
	},
	/**
	 * 获取 sessionStorage
	 * @param key sessionStorage名
	 * @returns 返回sessionStorage值得
	 */
	get(key: string) {
		let value = ''
		if (key && sessionStorage) {
			let data: any = sessionStorage.getItem(prefix + key)
			if (data !== null) {
				data = JSON.parse(data)
				if (data.expire === 0) {
					value = data.value
				} else if (data.expire < Date.now()) {
					this.remove(key)
				} else {
					value = data.value
				}
			}
			if (__IS_ENCRYPT__) {
				value = decryptData(value, __SECRET_KEY__, __SECRET_VI__)
			}
		}
		return value === '' ? '' : JSON.parse(value)
	},
	/**
	 * 删除sessionStorage
	 * @param key sessionStorage名
	 */
	remove(key: string) {
		sessionStorage.removeItem(prefix + key)
	}
}
