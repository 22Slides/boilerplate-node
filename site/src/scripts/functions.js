export function emailLinks() {
	const links = document.querySelectorAll('[rel="mail"]')
	for (const link of links) {
		let href = link.getAttribute('href')
		let email = href.split('#')
		email = `${email[0]}@${email[1]}.${email[2]}`
		if (href == link.innerText) link.innerText = email
		link.setAttribute('href', `mailto:${email}`)
	}
}
