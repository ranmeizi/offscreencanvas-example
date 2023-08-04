window.addEventListener('keydown', (e) => {
	worker.postMessage({
		type: 'keyCode',
		data: e.keyCode
	})
})
