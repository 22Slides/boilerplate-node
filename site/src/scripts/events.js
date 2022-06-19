import { emailLinks } from "./functions.js"

document.addEventListener('DOMContentLoaded', e => {

	emailLinks()

	setTimeout(() => {
		document.body.classList.remove('loading')
	}, 500)

})
