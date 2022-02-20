let list;
function genrand(numbers) {
	list = [Math.random(Math.floor(numbers*numbers-3)),Math.random(Math.floor(numbers-3)),Math.random(Math.floor(numbers/numbers*numbers-1)),Math.random(Math.floor(numbers-2)),Math.random(Math.floor(numbers*3))]
	list.forEach(element => {document.body.append(list.toString().replace(",", " "))})

}
document.querySelector("button").addEventListener("click", () => {document.querySelector("button").style.display = "none"})