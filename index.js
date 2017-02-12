'use strict'

const fs = require('fs')
const d3 = require('d3')
const Canvas = require('canvas')
const Image = Canvas.image
const _ = require('lodash')

const plot = require('./plot.js')
const histoV = require('./histoV.js')
const histoH = require('./histoH.js')

const w = 1440/2
const h = 900/2

const canvas = new Canvas(w, h)
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'white'
ctx.fillRect(0,0,w,h)


function create(filename){

	fs.readFile(__dirname + `/data/${filename}` ,  'utf8', (err, data)=>{

		ctx.fillStyle = 'white'
		ctx.fillRect(0,0,w,h)

		var csv = d3.csvParse(data)

		plot(canvas, csv)

		histoV(canvas, csv)

		histoH(canvas, csv)

		save(canvas, filename.replace(/.csv/g, '.png'))
	})
}


fs.readdir(`${__dirname}/data`, (err, files) => {
	_.each(files, (filename) => create(filename) )
})



function save(canvas, filename){
	var out = fs.createWriteStream(__dirname + `/output/${filename}`)
	var stream = canvas.pngStream()

	stream.on('data', (chunk) => out.write(chunk) )

	stream.on('end', () => console.log('saved', filename) )
}


