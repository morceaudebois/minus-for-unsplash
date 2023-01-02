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

// adds .unsplashPlus when using Firefox since it can't handle :has() 🙄
if ((navigator.userAgent.indexOf("Firefox") != -1)) {
    window.addEventListener('scroll', () => {
        document.querySelectorAll('.fMu6u').forEach(function (image) {
            image.closest('figure[itemprop="image"]').classList.add('unsplashPlus')
        });
    });
}