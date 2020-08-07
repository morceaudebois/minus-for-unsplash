// Si premier lancement, active isOn
chrome.storage.local.get(['isOn'], function(result) {
    if (result.isOn === undefined) {
        chrome.storage.local.set({isOn: true});
    }
});

// implémente la navigation dans les images
document.body.addEventListener('click', function(event) {
    // si dans la grid
    if (event.target.closest('.kIKUG')) {
        window.location.href = event.target.closest('.kIKUG').querySelector('a');
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