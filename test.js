//const worker = new Worker('worker.js')

/* worker.onmessage = function (ev) {
	console.log(ev.data)
}

worker.postMessage(1000000)

worker.onerror = function (ev) {
	console.error(ev.filename + ':' + ev.message)
	//如果发生错误,立即终止代码
	worker.terminate()
} */
const a = undefined

console.log(Number.isFinite(a))
