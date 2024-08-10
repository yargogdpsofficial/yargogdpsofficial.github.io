class Roulette {
    constructor() {
        const startBtn:HTMLElement = <HTMLElement>document.getElementById('start-roulette');
        const startMenu:HTMLElement = <HTMLElement>document.querySelector('.start-roulette');
        this.roulette = <HTMLElement>document.getElementById('roulette');

        startBtn.addEventListener('click', async () => {
            startMenu.style.display = 'none';
            this.list = await this.getList();

            this.addLevel();
        });
    }

    private addLevel():void {
        const list = this.list.split('\n');
        const level = list[this.getRandomInt(0, list.length - 1)].split(';');
        this.i++;

        const li:HTMLElement = document.createElement('li');
        li.className = 'roulette-item';
        this.roulette.appendChild(li);

        const liText:HTMLElement = document.createElement('div');
        liText.className = 'roulette-item-text';
        li.appendChild(liText);

        const h2:HTMLElement = document.createElement('h2');
        h2.textContent = '#' + this.i + ': ' + level[0];
        liText.appendChild(h2);

        const p:HTMLElement = document.createElement('p');
        p.textContent = 'By ' + level[1] + ' (ID: ' + level[2].replace(/ /g, '') + ')';
        liText.appendChild(p);

        if(this.i < 100) {
            const nextLvl:HTMLElement = document.createElement('div');
            nextLvl.className = 'next-lvl';
            nextLvl.textContent = 'Следующий уровень';
            li.appendChild(nextLvl);

            nextLvl.addEventListener('click', () => {
                nextLvl.style.display = 'none';
                this.addLevel();
            });
        }
    }

    private getList():Promise<string> {
        return new Promise((resolve, reject) => {
            const xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.open('GET', './demonlist/roulette.txt?' + this.getRandomInt(0, 999), true);
    
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.responseText);
                } else {
                    console.error('Ошибка при выполнении запроса: ', xhr.statusText);
                }
            }
    
            xhr.send();
        });
    }

    public getRandomInt(min:number, max:number):number {
        min = Math.ceil(min);
        max = Math.floor(max);
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private list:string = '';
    private i:number = 0;
    private roulette:HTMLElement;
}

const r = new Roulette();