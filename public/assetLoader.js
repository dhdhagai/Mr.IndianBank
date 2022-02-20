function css(nome) {
	link = document.createElement("link")
	link.rel = "stylesheet"
	link.href = `./assets/css/${nome}.css`
	document.body.appendChild(link)
}
function js(nome) {
	try {
		script = document.createElement("script")
	
		script.src = `./assets/js/${nome}.js`
		document.body.appendChild(script)}
		
	catch (error) {
		console.log(error)
	}

}
js("script")
js("mogo")
css("style")
