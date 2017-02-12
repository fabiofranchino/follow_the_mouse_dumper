'use strict'

module.exports = (canvas, csv) => {

	const w = canvas.width
	const h = canvas.height
	const ctx = canvas.getContext('2d')

	for(var i=0; i<csv.length; ++i){
		let d = csv[i]

		ctx.fillStyle = 'rgba(0,0,0,.5)'

		ctx.beginPath()
		ctx.arc(d.x*w, d.y*h, 1, 0, Math.PI*2)
		ctx.fill()

	}
}