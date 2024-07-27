"use strict";
class Admins {
    constructor() {
        this.loadAdmins();
    }
    loadAdmins() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './demonlist/admins.txt?' + this.getRandomInt(0, 999), true);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const lines = xhr.responseText.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (!lines[i])
                        continue;
                    const params = lines[i].split(';');
                    this.addAdmin(params[0], params[1], params[2]);
                }
            }
            else {
                console.error('Ошибка при выполнении запроса: ', xhr.statusText);
            }
        };
        xhr.send();
    }
    addAdmin(userName, role, desc) {
        const list = document.getElementById('adms-list');
        const li = document.createElement('li');
        li.className = 'adms-item';
        list.appendChild(li);
        const img = document.createElement('img');
        img.src = './assets/img/adms/' + userName + '.png';
        img.alt = 'admin';
        li.appendChild(img);
        const text = document.createElement('div');
        text.className = 'adms-item-text';
        li.appendChild(text);
        const h2 = document.createElement('h2');
        h2.textContent = userName + ' - ' + role;
        text.appendChild(h2);
        const p = document.createElement('p');
        p.textContent = desc;
        text.appendChild(p);
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
