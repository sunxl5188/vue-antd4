import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({ token: '', userInfo: {} }),
	getters: {},
	actions: {},
	persist: {
		//key: 'user',
		storage: localStorage,
		paths: ['count', 'userInfo']
	}
})
