import {
	createGlobalState,
	createInjectionState,
	createSharedComposable
} from '@vueuse/core'

// createGlobalState ===========================
export const useGlobalState = createGlobalState(() => {
	const theme = ref<string>('dark')
	const count = ref<number>(1)
	return { count, theme }
})

// createInjectionState ========================
const [useProvideCounterStore, useCounterStore] = createInjectionState(
	(initialValue: number) => {
		// state
		const count = ref(initialValue)
		// getters
		const double = computed(() => count.value * 2)
		// actions
		function increment() {
			count.value++
		}
		return { count, double, increment }
	}
)

export { useProvideCounterStore }
export { useCounterStore }

// createSharedComposable ======================
export const useSharedMouse = createSharedComposable(useMouse)
