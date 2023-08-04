importScripts('./node.js','./rule2.js')

var name = 3

// 2个长度的蛇
let interval = 200
// 方块大小
const r = 500 / 50

// 脑袋掌控方向
let head = null
// 尾巴会增长
let tail = null
// 吃的point
let point = null

// 上次移动时间
let last

const KEY = {
	W: 87,
	A: 65,
	S: 83,
	D: 68,
}
// 方向
let direction = KEY.D
let canvas
let ctx

self.addEventListener('message', function({
	data
}) {
	if (data.type === 'init') {
		canvas = data.data
		ctx = canvas.getContext('2d')

		init()

		requestAnimationFrame(draw)
	} else if (data.type === 'keyCode') {
		onKeyCode({
			keyCode: data.data
		})
	}
})

function onKeyCode(e) {
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
}

function init() {
	// score.innerHTML = 0
	interval = 200
	head = new Node([24, 24])

	head.next = new Node([23, 24])
	tail = head.next
	// 放置一个果子
	point = randomPoint()
}
init()

function randomPoint() {
	const x = Math.floor(Math.random() * 50)
	const y = Math.floor(Math.random() * 50)

	const p = new Node([x, y])

	function each(node) {
		console.log(compPos(node, p))
		if (compPos(node, p)) {
			throw '重新来'
		}
		node.next && each(node.next)
	}

	try {
		console.log(head.pos, p.pos)
		each(head)
		return p
	} catch (e) {
		console.log(e)
		return randomPoint()
	}
}

// 画身体
function drawItem(node) {
	const [x, y] = node.pos
	ctx.fillStyle = 'black';
	ctx.beginPath()
	ctx.moveTo(x * r, y * r)
	ctx.lineTo((x + 1) * r, y * r)
	ctx.lineTo((x + 1) * r, (y + 1) * r)
	ctx.lineTo(x * r, (y + 1) * r)
	ctx.closePath()
	ctx.fill();
	if (node.next) {
		drawItem(node.next)
	}
}

// 画point
function drawPoint() {
	const [x, y] = point.pos;
	ctx.fillStyle = 'red';
	ctx.beginPath()
	ctx.moveTo(x * r, y * r)
	ctx.lineTo((x + 1) * r, y * r)
	ctx.lineTo((x + 1) * r, (y + 1) * r)
	ctx.lineTo(x * r, (y + 1) * r)
	ctx.closePath()
	ctx.fill();
}

// 移动
function move(curr, next) {
	if (curr.next) {
		move(curr.next, curr)
	} else {
		// 没有了就给tail赋值
		tail = curr
	}
	curr.pos = [...next.pos]
}

// 清除画布
function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 画图函数
function draw(timestamp) {
	try {
		clear()
		if (!last) {
			last = timestamp
		}
		if (timestamp - last > interval) {
			// 前进
			const next = getNextStep()
			move(head, next)
			last = timestamp
		}
		drawItem(head)

		drawPoint()

		ctx.commit()
	} catch (e){
		console.log(e)
	}


	requestAnimationFrame(draw)
}
