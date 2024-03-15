import {
	AxiosInstance,
	AxiosRequestConfig,
	InternalAxiosRequestConfig,
	AxiosPromise
} from 'axios'

export interface AxiosType {
	request(config?: InternalAxiosRequestConfig): AxiosInstance
	fetch(url: string, params?: object, config?: AxiosRequestConfig): AxiosPromise
	post(url: string, data: object, config?: AxiosRequestConfig): AxiosPromise
	put(url: string, params: object, config?: AxiosRequestConfig): AxiosPromise
	patch(url: string, params: object, config?: AxiosRequestConfig): AxiosPromise
	del(url: string, params: object, config?: AxiosRequestConfig): AxiosPromise
}
