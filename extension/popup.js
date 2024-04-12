let onOff = document.getElementById('onOff')

// Si premier lancement, active isOn
chrome.storage.local.get(['isOn'], function(result) {
    if (result.isOn === undefined) {
        chrome.storage.local.set({isOn: true})
    }
})

// fonction pour toggle la couleur
function color() {
    chrome.storage.local.get(['isOn'], function(result) {
        if (result.isOn) {
            onOff.querySelector('img').title = 'Minus for Unsplash is on'
            onOff.classList.remove('disabled')
        } else {
            onOff.querySelector('img').title = 'Minus for Unsplash is off'
            onOff.classList.add('disabled')
        } 
    })
} color()

// toggle la couleur et l'état de isOn
onOff.onclick = function() {
    chrome.storage.local.get(['isOn'], function(result) {
        chrome.storage.local.set({isOn: !result.isOn})
        color()
    })
}