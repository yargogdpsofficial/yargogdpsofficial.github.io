"use strict";
const headerBlock = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        headerBlock.classList.add('border-bottom');
    }
    else {
        headerBlock.classList.remove('border-bottom');
    }
});
