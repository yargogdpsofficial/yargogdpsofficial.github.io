"use strict";
const modalWindow = document.getElementById('modal-window');
const digR = document.getElementById('dig');
document.addEventListener('click', (e) => {
    if (modalWindow.classList.contains('active') && !modalWindow.contains(e.target)) {
        document.body.style.overflowY = 'auto';
        modalWindow.classList.remove('active');
        digR.classList.remove('active');
    }
});
