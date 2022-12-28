// Si premier lancement, active isOn
chrome.storage.local.get(['isOn'], function(result) {
    if (result.isOn === undefined) {
        chrome.storage.local.set({isOn: true});
    }
});

// ajout .instanon au body si activé
chrome.storage.local.get(['isOn'], function(result) {
    if (result.isOn) {
        document.body.classList.add('instanon');
    } else {
        document.body.classList.remove('instanon');
    }
});

// ajout .instanon au body à chaque changement de .isOn
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
        if (changes.isOn.newValue) {
            document.body.classList.add('instanon');
        } else {
            document.body.classList.remove('instanon');
        }
    }
});