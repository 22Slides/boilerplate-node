import express from 'express'
import path from 'path'
import fs from 'fs'
import fetch from 'node-fetch'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

// Setup Express
const app = express()
app.set('view engine', 'ejs')

// Global variables
const __dirname = path.dirname(fileURLToPath(import.meta.url))
global.root = path.join(path.resolve(__dirname))
global.log = (process.env.ENV === "dev" ? console.log : () => {})

// Route: static files
app.use('/dist', express.static('dist'))

// Route: everything else
app.get('/:slug?', async (req, res, next) => {

	let { slug } = req.params
	if (!slug) slug = ""
	const url = `https://${process.env.TTS_URL}/api/${slug}`

	try {
		
		const response = await fetch(url)
		const data = await response.json()
		const view = (fs.existsSync(path.join(global.root, 'views', `${slug}.ejs`)) ? slug : 'index')
		res.render(view, data)
		log({ url })
		log(data.content)

	} catch (error) {
		console.log(error)
	}

})

// Start server
app.listen(process.env.PORT, process.env.HOST, () => {
	log(`App listening on http://${process.env.HOST}:${process.env.PORT}`)
})







