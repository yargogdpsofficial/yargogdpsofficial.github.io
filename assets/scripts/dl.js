"use strict";
class DLLIB {
    constructor() {
        this.dli = 0;
    }
    addDemon(name, author, id, link) {
        this.dli++;
        const list = document.getElementById('dl');
        const item = document.createElement('li');
        item.className = 'dl-item';
        item.onclick = () => location.href = link;
        list.appendChild(item);
        const img = document.createElement('img');
        img.src = './assets/img/lvls/' + id + '.png?' + this.getRandomInt(100000, 999999);
        img.alt = '';
        item.appendChild(img);
        const div = document.createElement('div');
        item.appendChild(div);
        const h2 = document.createElement('h2');
        h2.textContent = this.dli + '. ' + name;
        div.appendChild(h2);
        const p = document.createElement('p');
        p.textContent = 'by ' + author;
        div.appendChild(p);
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
class Demonlist extends DLLIB {
    constructor() {
        super();
        this.loadDemons();
    }
    loadDemons() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './demonlist/demons.txt?' + this.getRandomInt(0, 999), true);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const lines = xhr.responseText.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (!lines[i])
                        continue;
                    const params = lines[i].split(';');
                    this.addDemon(params[0], params[1], params[2].toString(), params[3]);
                }
            }
            else {
                console.error('Ошибка при выполнении запроса: ', xhr.statusText);
            }
        };
        xhr.send();
    }
}
