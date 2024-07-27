const hamburger:HTMLElement = <HTMLElement>document.getElementById('hamburger');
const menu:HTMLElement = <HTMLElement>document.getElementById('menu');

hamburger.addEventListener('click', () => {
    !hamburger.classList.contains('active') ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto'
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});