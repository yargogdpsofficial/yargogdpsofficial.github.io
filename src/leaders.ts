class Leaders {
    constructor() {
        this.list = <HTMLElement>document.getElementById('leaders-list');
        this.i = 0;

        this.MVLVLNAME = <HTMLElement>document.getElementById('dl-mw-lvlname');
        this.MV = <HTMLElement>document.getElementById('modal-window');
        this.DIG = <HTMLElement>document.getElementById('dig');
        this.MVUL = <HTMLElement>document.getElementById('mvul');

        this.loadLeaders();
    }

    public getRandomInt(min:number, max:number):number {
        min = Math.ceil(min);
        max = Math.floor(max);
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private addPlayer(username:string, role:string):void {
        this.i++;
        role = role.replace(' ', '');
        const item:HTMLElement = document.createElement('li');
        item.className = 'leaders-item';
        this.list.appendChild(item);

        item.addEventListener('click', async (e:MouseEvent) => {
            e.stopPropagation();
            this.rli = 0;
            document.body.style.overflowY = 'hidden';

            this.MVLVLNAME.textContent = 'Рекорды ' + username;
            const records:any = await this.loadRecords(username);
            const rlines:Array<string> = records.split('\n') as Array<string>;
            rlines.pop();

            this.MVUL.innerHTML = '';

            for(let i = 0; i < rlines.length; i++) {
                const params = rlines[i].split(';');
                this.rli++;

                const li:HTMLElement = document.createElement('li');
                this.MVUL.appendChild(li);

                const a = document.createElement('a');
                a.textContent = this.rli.toString() + '. ' + params[0];
                a.href = params[1];
                li.appendChild(a);
            }

            this.MV.classList.add('active');
            this.DIG.classList.add('active');
        });

        const h3:HTMLElement = document.createElement('h3');
        h3.textContent = '#' + this.i + ' ' + username;
        item.appendChild(h3);

        if(role != 'null') {
            const img:any = document.createElement('img');
            img.alt = '';

            if(role == 'mod') {
                img.src = './assets/img/icon/mod.png';
            } else if(role == 'emod') {
                img.src = './assets/img/icon/elder_mod.png';
            } else {
                img.src = './assets/img/icon/null.png';
                console.log(role)
            }

            item.appendChild(img);
        }
    }

    private async loadLeaders():Promise<string> {
        return new Promise((resolve, reject) => {
            const xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.open('GET', './demonlist/leaders.txt?' + this.getRandomInt(0, 999), true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const lines:ReadonlyArray<string> = xhr.responseText.split('\n');
                    let r = '';

                    for(let i:number = 0; i < lines.length; i++) {
                        if(!lines[i]) continue;

                        const params:ReadonlyArray<string> = lines[i].split(';');
                        this.addPlayer(params[0], params[1]);
                    }
                } else {
                    console.error('Ошибка при выполнении запроса: ', xhr.statusText);
                    reject(xhr.statusText);
                }
            }

            xhr.send();
        });
    }

    private async loadRecords(userName:string):Promise<string> {
        return new Promise((resolve, reject) => {
            const xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.open('GET', './demonlist/records.txt?' + this.getRandomInt(0, 999), true);

            xhr.onload = async () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const lines:ReadonlyArray<string> = xhr.responseText.split('\n');
                    let r = '';

                    for(let i:number = 0; i < lines.length; i++) {
                        if(!lines[i]) continue;
                        else if(lines[i].split(';')[0] == userName) {
                            const lvlname:string = await this.getLvlnameFromID(lines[i].split(';')[1]);
                            r += lvlname + ';' + lines[i].split(';')[2] + "\n";
                        }
                    }

                    resolve(r);
                } else {
                    console.error('Ошибка при выполнении запроса: ', xhr.statusText);
                    reject(xhr.statusText);
                }
            }

            xhr.send();
        });
    }

    private async getLvlnameFromID(lvlID:string):Promise<string> {
        return new Promise((resolve, reject) => {
            const xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.open('GET', './demonlist/demons.txt?' + this.getRandomInt(0, 999), true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const lines:ReadonlyArray<string> = xhr.responseText.split('\n');
                    let r = '';

                    for(let i:number = 0; i < lines.length; i++) {
                        if(!lines[i]) continue;
                        else if(lines[i].split(';')[2] == lvlID) resolve(lines[i].split(';')[0]);
                    }
                } else {
                    console.error('Ошибка при выполнении запроса: ', xhr.statusText);
                    reject(xhr.statusText);
                }
            }

            xhr.send();
        });
    }

    private list:HTMLElement;
    private i:number = 0;

    private rli:number = 0;
    private MVLVLNAME:HTMLElement;
    private MV:HTMLElement;
    private DIG:HTMLElement;
    private MVUL:HTMLElement;
}

const l:Leaders = new Leaders();