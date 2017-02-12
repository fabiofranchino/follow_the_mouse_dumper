'use strict'

const d3 = require('d3')


module.exports = (canvas, csv) => {

	const w = canvas.width
	const h = canvas.height
	const ctx = canvas.getContext('2d')

	var nest = d3.nest()
		.key(function(d){
			return d.y
		})
		.sortKeys(d3.ascending)
		.entries(csv)

	var max = d3.max(nest, function(d){
		return d.values.length
	})


	var mapy = d3.scaleLinear()
		.domain([0, 1])
		.range([0, w])

	var mapw = d3.scaleLinear()
		.domain([0, max])
		.range([0, h])

	ctx.fillStyle = 'rgba(20,130,210,.60)'
	for(var i=0; i<nest.length; ++i){
		let d = nest[i]
		ctx.fillRect(0,mapy(d.key),mapw(d.values.length), 1)
	}


}



