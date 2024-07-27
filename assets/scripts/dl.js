"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DLLIB {
    constructor() {
        this.dli = 0;
        this.MVLVLNAME = document.getElementById('dl-mw-lvlname');
        this.MV = document.getElementById('modal-window');
        this.DIG = document.getElementById('dig');
        this.MVUL = document.getElementById('mvul');
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    addDemon(name, author, id, link) {
        this.dli++;
        const list = document.getElementById('dl');
        const item = document.createElement('li');
        item.className = 'dl-item';
        list.appendChild(item);
        item.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            e.stopPropagation();
            document.body.style.overflowY = 'hidden';
            this.MVLVLNAME.textContent = name;
            const records = yield this.loadRecords(String(id));
            const rlines = records.split('\n');
            rlines.pop();
            this.MVUL.innerHTML = '';
            for (let i = 0; i < rlines.length; i++) {
                const params = rlines[i].split(';');
                const li = document.createElement('li');
                this.MVUL.appendChild(li);
                const a = document.createElement('a');
                a.textContent = params[0];
                a.href = params[2];
                li.appendChild(a);
            }
            this.MV.classList.add('active');
            this.DIG.classList.add('active');
        }));
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
    loadRecords(lvlID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', './demonlist/records.txt?' + this.getRandomInt(0, 999), true);
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const lines = xhr.responseText.split('\n');
                        let r = '';
                        for (let i = 0; i < lines.length; i++) {
                            if (!lines[i])
                                continue;
                            if (lines[i].split(';')[1] == String(lvlID)) {
                                r += lines[i] + "\n";
                            }
                        }
                        resolve(r);
                    }
                    else {
                        console.error('Ошибка при выполнении запроса: ', xhr.statusText);
                        reject(xhr.statusText);
                    }
                };
                xhr.send();
            });
        });
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
