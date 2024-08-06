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
class Leaders {
    constructor() {
        this.i = 0;
        this.rli = 0;
        this.list = document.getElementById('leaders-list');
        this.i = 0;
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
    addPlayer(username, role) {
        this.i++;
        role = role.replace(' ', '');
        const item = document.createElement('li');
        item.className = 'leaders-item';
        this.list.appendChild(item);
        item.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            e.stopPropagation();
            this.rli = 0;
            document.body.style.overflowY = 'hidden';
            this.MVLVLNAME.textContent = 'Рекорды ' + username;
            const records = yield this.loadRecords(username);
            const rlines = records.split('\n');
            rlines.pop();
            this.MVUL.innerHTML = '';
            for (let i = 0; i < rlines.length; i++) {
                const params = rlines[i].split(';');
                this.rli++;
                const li = document.createElement('li');
                this.MVUL.appendChild(li);
                const a = document.createElement('a');
                a.textContent = this.rli.toString() + '. ' + params[0];
                a.href = params[1];
                li.appendChild(a);
            }
            this.MV.classList.add('active');
            this.DIG.classList.add('active');
        }));
        const h3 = document.createElement('h3');
        h3.textContent = '#' + this.i + ' ' + username;
        item.appendChild(h3);
        if (role != 'null') {
            const img = document.createElement('img');
            img.alt = '';
            if (role == 'mod') {
                img.src = './assets/img/icon/mod.png';
            }
            else if (role == 'emod') {
                img.src = './assets/img/icon/elder_mod.png';
            }
            else {
                img.src = './assets/img/icon/null.png';
                console.log(role);
            }
            item.appendChild(img);
        }
    }
    loadLeaders() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', './demonlist/leaders.txt?' + this.getRandomInt(0, 999), true);
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const lines = xhr.responseText.split('\n');
                        let r = '';
                        for (let i = 0; i < lines.length; i++) {
                            if (!lines[i])
                                continue;
                            const params = lines[i].split(';');
                            this.addPlayer(params[0], params[1]);
                        }
                        resolve('1');
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
    loadRecords(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', './demonlist/records.txt?' + this.getRandomInt(0, 999), true);
                xhr.onload = () => __awaiter(this, void 0, void 0, function* () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const lines = xhr.responseText.split('\n');
                        let r = '';
                        for (let i = 0; i < lines.length; i++) {
                            if (!lines[i])
                                continue;
                            else if (lines[i].split(';')[0] == userName) {
                                const lvlname = yield this.getLvlnameFromID(lines[i].split(';')[1]);
                                r += lvlname + ';' + lines[i].split(';')[2] + "\n";
                            }
                        }
                        resolve(r);
                    }
                    else {
                        console.error('Ошибка при выполнении запроса: ', xhr.statusText);
                        reject(xhr.statusText);
                    }
                });
                xhr.send();
            });
        });
    }
    getLvlnameFromID(lvlID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', './demonlist/demons.txt?' + this.getRandomInt(0, 999), true);
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const lines = xhr.responseText.split('\n');
                        let r = '';
                        for (let i = 0; i < lines.length; i++) {
                            if (!lines[i])
                                continue;
                            else if (lines[i].split(';')[2] == lvlID)
                                resolve(lines[i].split(';')[0]);
                        }
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
const l = new Leaders();
leaders();
function leaders() {
    return __awaiter(this, void 0, void 0, function* () {
        yield l.loadLeaders();
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
}
