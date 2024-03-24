import CryptoJS from 'crypto-js'

const generateKey = (key: string) => {
	const keys = CryptoJS.MD5(key).toString()
	const SECRET_KEY = CryptoJS.enc.Utf8.parse(keys) //十六位十六进制数作为密钥
	return SECRET_KEY
}
const generateIv = (iv: string) => {
	const _vi = CryptoJS.MD5(iv).toString()
	const SECRET_IV = CryptoJS.enc.Utf8.parse(_vi) //十六位十六进制数作为密钥偏移量
	return SECRET_IV
}
/**
 * AES加密
 * @param data 加密数据
 * @returns 返回加密数据
 */
export const encryptData = (data: any, key: string, iv: string): string => {
	if (typeof data === 'object') {
		try {
			data = JSON.stringify(data)
		} catch (e) {
			throw new Error('encrypt error' + e)
		}
	}
	const dataHex = CryptoJS.enc.Utf8.parse(data)
	const encrypted = CryptoJS.AES.encrypt(dataHex, generateKey(key), {
		iv: generateIv(iv),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
	return encrypted.ciphertext.toString()
}

/**
 * AES解密
 * @param data 解密数据
 * @returns 返回解密结果
 */
export const decryptData = (data: string, key: string, iv: string): string => {
	//解密
	const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
	const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
	const decrypt = CryptoJS.AES.decrypt(str, generateKey(key), {
		iv: generateIv(iv),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	})
	const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
	return decryptedStr.toString()
}
