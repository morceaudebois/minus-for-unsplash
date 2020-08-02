document.body.addEventListener('click', function(event) {
    // si dans la grid
    if (event.target.closest('.kIKUG')) {
        window.location.href = event.target.closest('.kIKUG').querySelector('a');
    } 
});