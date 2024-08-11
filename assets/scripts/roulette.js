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
class Roulette {
    constructor() {
        this.usedIndexes = new Set();
        this.list = '';
        this.i = 0;
        const startBtn = document.getElementById('start-roulette');
        const startMenu = document.querySelector('.start-roulette');
        this.roulette = document.getElementById('roulette');
        startBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            startMenu.style.display = 'none';
            this.list = yield this.getList();
            this.usedIndexes = new Set();
            this.addLevel();
        }));
    }
    addLevel() {
        const list = this.list.split('\n');
        if (this.usedIndexes.size >= list.length) {
            console.log("Все уровни уже использованы!");
            return;
        }
        let index;
        do {
            index = this.getRandomInt(0, list.length - 1);
        } while (this.usedIndexes.has(index));
        this.usedIndexes.add(index);
        const level = list[index].split(';');
        this.i++;
        const li = document.createElement('li');
        li.className = 'roulette-item';
        this.roulette.appendChild(li);
        const liText = document.createElement('div');
        liText.className = 'roulette-item-text';
        li.appendChild(liText);
        const h2 = document.createElement('h2');
        h2.textContent = '#' + this.i + ': ' + level[0];
        liText.appendChild(h2);
        const p = document.createElement('p');
        p.textContent = 'By ' + level[1] + ' (ID: ' + level[2].replace(/ /g, '') + ')';
        liText.appendChild(p);
        if (this.i < 100 && this.usedIndexes.size < list.length) {
            const nextLvl = document.createElement('div');
            nextLvl.className = 'next-lvl';
            nextLvl.textContent = 'Следующий уровень';
            li.appendChild(nextLvl);
            nextLvl.addEventListener('click', () => {
                nextLvl.style.display = 'none';
                this.addLevel();
            });
        }
    }
    getList() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', './demonlist/roulette.txt?' + this.getRandomInt(0, 999), true);
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let r = '';
                    const lines = xhr.responseText.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        if (!lines[i])
                            continue;
                        r += lines[i] + '\n';
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
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
const r = new Roulette();
