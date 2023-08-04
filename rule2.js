/**
 * 根据head 和direction 计算出下一步
 * 规则是
 * 1.下一步是自己的身体 =》死
 * 2.下一步是墙壁 =》死
 * 3.下一步是point =》 长一个尾巴
 */
function getNextStep() {
	try {
		let pos
		switch (direction) {
			case KEY.W:
				pos = [head.pos[0], head.pos[1] - 1];
				break
			case KEY.A:
				pos = [head.pos[0] - 1, head.pos[1]];
				break
			case KEY.S:
				pos = [head.pos[0], head.pos[1] + 1];
				break
			case KEY.D:
				pos = [head.pos[0] + 1, head.pos[1]];
				break
		}
		next = new Node(pos)

		checkBody(next)

		checkWall(next)

		if (checkPoint(next)) {
			// score.innerHTML = Number(score.innerHTML) + 1
			updateScore()
			// 增加一个格子
			tail.next = new Node(tail.pos)
			point = randomPoint()
			if (interval > 20) {
				interval = interval - 5
			}
		}
		return next
	} catch (e) {
		// 死
		// alert('这个玩家就是逊啦')
		die()
		init()
	}
}

function compPos(p1, p2) {
	if (p1.pos[0] === p2.pos[0] && p1.pos[1] === p2.pos[1]) {
		return true
	} else {
		return false
	}
}

// 是否撞到身体，是的话抛出异常
function checkBody(next) {
	function eachNode(node) {
		if (compPos(next, node)) {
			throw '碰到身体'
		}
		node.next && eachNode(node.next)
	}
	eachNode(head.next)
}

// 是否撞到墙壁，是的话抛出异常
function checkWall({
	pos
}) {
	const [x, y] = pos
	if (x < 0 || y < 0 || x >= 50 || y >= 50) {
		throw '碰到墙壁'
	}
}

// 是否吃到point，返回布尔
function checkPoint(next) {
	return compPos(next, point)
}

function updateScore() {
	self.postMessage({
		type: 'updateScore'
	})
}

function die() {
	self.postMessage({
		type: 'die'
	})
}
