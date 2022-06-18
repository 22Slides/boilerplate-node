const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
app.set('view engine', 'ejs')

global.root = path.join(path.resolve(__dirname))

app.use('/dist', express.static('dist'))

app.get('/:slug?', async (req, res, next) => {

	const { slug } = req.params

	const data = await fetch(`https://${process.env.TTS_URL}/api/${slug}`)

	const view = (fs.existsSync(path.join(global.root, 'views', `${slug}.ejs`)) ? slug : 'index')

	res.render(view, data)

})

app.listen(process.env.PORT, process.env.HOST, () => {
	console.log(`App listening on http://${process.env.HOST}:${process.env.PORT}`)
})
