import { defineStore } from 'pinia'

interface StateType {
	network: boolean
	keepAlive: string[]
}

export const useAppStore = defineStore('app', {
	state: (): StateType => ({
		network: true,
		keepAlive: []
	}),
	getters: {
		keepArray: (state): string[] => state.keepAlive
	},
	actions: {
		//设置网络状态
		setNetWork(status: boolean): void {
			this.network = status
		},
		//设置页面缓存
		setKeepAlive(data: string[]): void {
			this.keepAlive = data
		}
	}
})
