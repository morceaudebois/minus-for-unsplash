// Si premier lancement, ajoute isOn
chrome.storage.local.get(['isOn'], function (result) {
    if (result.isOn === undefined)
        chrome.storage.local.set({
            isOn: true
        })
})

function setState(state) {
    if (state) document.body.classList.add('unminus')
    else document.body.classList.remove('unminus')
}

function yeet() {
    // Detected if a link to plus exists.
    document.querySelectorAll('a[href*="/plus?"]').forEach(function (image) {
        image.closest('figure[itemprop="image"]').classList.add('unsplashPlus')
    })
}

// ajout .unminus au body si activé
chrome.storage.local.get(['isOn'], function (result) {
    setState(result.isOn)
})

// ajout .unminus au body à chaque changement de .isOn
chrome.storage.onChanged.addListener(function (changes) {
    setState(changes.isOn.newValue)
})

// adds .unsplashPlus when using Firefox since it can't handle :has() 🙄
if ((navigator.userAgent.indexOf("Firefox") != -1))
    setInterval(yeet, 200)


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
    document.querySelectorAll(selector).forEach(element => {
        callback(element)
    })
}

function removeCollections() {
    handleElementsInView('div[data-test="collection-feed-card"]', element => {
        if (element.querySelector('.WZO3o').innerHTML.includes('Unsplash+')) {
            element.classList.add('hidden')
        }
    })
}

// looks for collections on scroll & load
window.addEventListener('scroll', debounce(removeCollections, 50))

setTimeout(removeCollections, 200)