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
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
global.root = path.join(path.resolve(__dirname))

// Route: static files
app.use('/dist', express.static('dist'))

// Route: everything else
app.get('/:slug?', async (req, res, next) => {

	const { slug } = req.params
	const data = await fetch(`https://${process.env.TTS_URL}/api/${slug}`)
	log(data)
	const view = (fs.existsSync(path.join(global.root, 'views', `${slug}.ejs`)) ? slug : 'index')
	res.render(view, data)

})

// Start server
app.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`App listening on http://${process.env.HOST}:${process.env.PORT}`)
})



