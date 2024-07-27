"use strict";
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger.addEventListener('click', () => {
    !hamburger.classList.contains('active') ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});
