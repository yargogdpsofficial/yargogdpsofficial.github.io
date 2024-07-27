const modalWindow:HTMLElement = <HTMLElement>document.getElementById('modal-window');
const digR:HTMLElement = <HTMLElement>document.getElementById('dig');

document.addEventListener('click', (e: MouseEvent) => {
    if (modalWindow.classList.contains('active') && !modalWindow.contains(<Node>e.target)) {
        document.body.style.overflowY = 'auto';
        modalWindow.classList.remove('active');
        digR.classList.remove('active');
    }
});