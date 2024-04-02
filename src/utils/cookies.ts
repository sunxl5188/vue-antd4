import vueCookies from 'vue-cookies'

const prefix = __APP_PREFIX__ + '-' + __APP_VERSION__ + '-'
const $cookies: any = vueCookies

$cookies.config('1d', ';path=/', '', true, ';SameSite=Lax')

export default {
	/**
	 * 获取cookies值
	 * @param key cookie名
	 * @returns 返回cookies值
	 */
	get: (key: string): any => {
		return $cookies.get(prefix + key)
	},
	/**
	 * 设置cookie
	 * @param keyName cookie名
	 * @param value cookie值
	 * @param expires cookie有效时间，默认时间为1d
	 * @param path cookie所在目录，默认 '/' 根目录
	 * @param domain cookie所在的域，默认为请求地址
	 * @param secure Secure属性是说如果一个cookie被设置了Secure=true，那么这个cookie只能用https协议发送给服务器，用http协议不发送。
	 * @param sameSite 用来限制第三方 Cookie，从而减少安全风险, 可以设置三个值 Strict Lax None
	 */
	set: (
		keyName: string,
		value: any,
		expires?: string | number | Date,
		path?: string,
		domain?: string,
		secure?: boolean,
		sameSite?: string
	): void => {
		$cookies.set(
			prefix + keyName,
			value,
			expires,
			path,
			domain,
			secure,
			sameSite
		)
	},
	/**
	 * 删除cookie
	 * @param keyName cookie名
	 * @param path cookie所在目录，默认 '/' 根目录
	 * @param domain cookie所在的域，默认为请求地址
	 * @returns
	 */
	remove: (keyName: string, path?: string, domain?: string): boolean => {
		return $cookies.remove(prefix + keyName, path, domain)
	},
	/**
	 * 是否有key cookie
	 * @param key cookie名
	 * @returns boolean
	 */
	isKey: (key: string): boolean => {
		return $cookies.isKey(prefix + key)
	},
	/**
	 * 列出所有cookie
	 * @returns 返回数组
	 */
	keys: (): string[] => {
		return $cookies.keys()
	}
}
