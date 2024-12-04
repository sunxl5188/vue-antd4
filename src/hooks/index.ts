export const useCommon = () => {
	const debounce = (fn: any, delay: number) => {
		let timer: any = null
		return function () {
			if (timer) clearTimeout(timer)
			timer = setTimeout(function () {
				fn.apply()
			}, delay)
		}
	}

	return { debounce }
}
