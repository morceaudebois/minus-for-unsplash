// Si premier lancement, active isOn
chrome.storage.local.get(['isOn'], function (result) {
    if (result.isOn === undefined) {
        chrome.storage.local.set({ isOn: true });
    }
});

function setState(state) {
    if (state) document.body.classList.add('unminus')
    else document.body.classList.remove('unminus')
}

// ajout .unminus au body si activé
chrome.storage.local.get(['isOn'], function (result) {
    setState(result.isOn)
});

// ajout .unminus au body à chaque changement de .isOn
chrome.storage.onChanged.addListener(function (changes) {
    for (var key in changes) {
        setState(changes.isOn.newValue)
    }
});