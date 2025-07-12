// If first launch, add isOn
chrome.storage.local.get(["isOn"], function (result) {
	if (result.isOn === undefined)
		chrome.storage.local.set({
			isOn: true,
		})
})

function setState(state) {
	if (state) document.body.classList.add("unminus")
	else document.body.classList.remove("unminus")
}

// add .unminus to body if enabled
chrome.storage.local.get(["isOn"], function (result) {
	setState(result.isOn)
})

// add .unminus to body on every change of .isOn
chrome.storage.onChanged.addListener(function (changes) {
	setState(changes.isOn.newValue)
})

function debounce(func, delay) {
	let timeoutId

	return function () {
		const context = this
		const args = arguments
		clearTimeout(timeoutId)

		timeoutId = setTimeout(() => {
			func.apply(context, args)
		}, delay)
	}
}

function handleElementsInView(selector, callback) {
	document.querySelectorAll(selector).forEach((element) => {
		callback(element)
	})
}

function removeCollections() {
	handleElementsInView(
		'figure:has(img[src^="https://plus.unsplash.com"])',
		(element) => {
			element.classList.add("hidden")
		}
	)
}

// looks for collections on scroll & load
window.addEventListener("scroll", debounce(removeCollections, 50))

setTimeout(removeCollections, 200)
