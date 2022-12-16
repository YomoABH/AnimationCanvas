
const animate = () => {
	const canvas = document.createElement('canvas')

	const ctx = canvas.getContext('2d')

	const w = canvas.width = innerWidth
	const h = canvas.height = innerHeight

	const dots = []

	const params = {
		bgColor: "rgb(17, 2, 2)",
		dotsColor: "rgba(255, 40, 40, 1)",
		dotsRadius: 2,
		dotsCount: 60,
		dotsMaxSpeed: 0.6,
		lineLength: 156,
	}

	document.querySelector('body').appendChild(canvas)

	window.onresize = () => {
		const w = canvas.width = innerWidth
		const h = canvas.height = innerHeight
	}

	class Dots {
		constructor() {
			this.x = Math.random() * w
			this.y = Math.random() * h
			this.speedX = Math.random() * (params.dotsMaxSpeed * 2) - params.dotsMaxSpeed
			this.speedY = Math.random() * (params.dotsMaxSpeed * 2) - params.dotsMaxSpeed
		}
		position() {
			this.x + this.speedX > w && this.x > 0 || this.x + this.speedX < 0 && this.x < 0 ? this.speedX *= -1 : this.speedX
			this.y + this.speedY > w && this.y > 0 || this.y + this.speedY < 0 && this.y < 0 ? this.speedY *= -1 : this.speedY
			this.x += this.speedX
			this.y += this.speedY
		}
		reDraw() {
			ctx.beginPath()
			ctx.arc(this.x, this.y, params.dotsRadius, 0, Math.PI * 2)
			ctx.closePath()
			ctx.fillStyle = params.dotsColor
			ctx.fill()
		}
	}


	const reDrawtBg = () => {
		ctx.fillStyle = params.bgColor
		ctx.fillRect(0, 0, w, h)
	}

	const reDrawDots = () => {
		for (let i in dots) {
			dots[i].reDraw()
			dots[i].position()
		}
	}

	const drawLines = () => {
		let x1, y1, x2, y2, length, opasity
		for (let i in dots) {
			for (let j in dots) {
				x1 = dots[i].x
				y1 = dots[i].y

				x2 = dots[j].x
				y2 = dots[j].y

				length = Math.sqrt((Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)))
				if (length < params.lineLength) {
					ctx.lineWidth = '0.4'
					ctx.strokeStyle = 'rgba(255, 40, 40, 1)'
					ctx.beginPath()
					ctx.moveTo(x1, y1)
					ctx.lineTo(x2, y2)
					ctx.closePath()
					ctx.stroke()
				}
			}
		}
	}

	const loop = () => {
		reDrawtBg()
		drawLines()
		reDrawDots()
		requestAnimationFrame(loop)
	}

	const init = () => {
		for (let i = 0; i < params.dotsCount; i++) {
			dots.push(new Dots)
		}
		loop()
	}

	init()
}


animate()