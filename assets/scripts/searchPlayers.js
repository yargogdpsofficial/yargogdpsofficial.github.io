"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('searchLeaders');
    const listItems = document.querySelectorAll('.leaders-item');
    search.addEventListener('input', (e) => {
        const filter = search.value.toLowerCase();
        for (let i = 0; i < listItems.length; i++) {
            const item = listItems[i];
            const text = item.textContent || item.innerText;
            if (text.toLowerCase().indexOf(filter) > -1) {
                item.classList.remove('hidden');
            }
            else {
                item.classList.add('hidden');
            }
        }
    });
});
