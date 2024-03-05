import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({ network: true }),
	getters: {},
	actions: {
		//设置网络状态
		setNetWork(status: boolean): void {
			this.network = status
		}
	}
})
