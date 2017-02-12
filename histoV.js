'use strict'

const d3 = require('d3')


module.exports = (canvas, csv) => {

	const w = canvas.width
	const h = canvas.height
	const ctx = canvas.getContext('2d')

	var nest = d3.nest()
		.key(function(d){
			return d.x
		})
		.sortKeys(d3.ascending)
		.entries(csv)

	var max = d3.max(nest, function(d){
		return d.values.length
	})


	var mapx = d3.scaleLinear()
		.domain([0, 1])
		.range([0, w])

	var maph = d3.scaleLinear()
		.domain([0, max])
		.range([0, h])

	ctx.fillStyle = 'rgba(230,90,50,.60)'
	for(var i=0; i<nest.length; ++i){
		let d = nest[i]
		ctx.fillRect(mapx(d.key),h-maph(d.values.length),1,maph(d.values.length))
	}


}