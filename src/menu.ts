const hamburger:HTMLElement = <HTMLElement>document.getElementById('hamburger');
const menu:HTMLElement = <HTMLElement>document.getElementById('menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});