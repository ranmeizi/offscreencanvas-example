window.addEventListener('keydown', (e) => {
	if (e.keyCode === KEY.W || e.keyCode === 38) {
		if (direction === KEY.S) {
			return
		}
		direction = KEY.W
	}
	if (e.keyCode === KEY.A || e.keyCode === 37) {
		if (direction === KEY.D) {
			return
		}
		direction = KEY.A
	}
	if (e.keyCode === KEY.S || e.keyCode === 40) {
		if (direction === KEY.W) {
			return
		}
		direction = KEY.S
	}
	if (e.keyCode === KEY.D || e.keyCode === 39) {
		if (direction === KEY.A) {
			return
		}
		direction = KEY.D
	}
})
