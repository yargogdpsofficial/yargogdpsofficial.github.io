class DLLIB {
    constructor() {
        this.MVLVLNAME = <HTMLElement>document.getElementById('dl-mw-lvlname');
        this.MV = <HTMLElement>document.getElementById('modal-window');
        this.DIG = <HTMLElement>document.getElementById('dig');
        this.MVUL = <HTMLElement>document.getElementById('mvul');
    }

    public getRandomInt(min:number, max:number):number {
        min = Math.ceil(min);
        max = Math.floor(max);
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    protected addDemon(name:string, author:string, id:string | number, link:string):void {
        this.dli++;

        const list:HTMLElement = <HTMLElement>document.getElementById('dl');
        const item:HTMLElement  = document.createElement('li');
        item.className = 'dl-item';
        list.appendChild(item);

        item.addEventListener('click', async (e:MouseEvent) => {
            e.stopPropagation();
            document.body.style.overflowY = 'hidden';

            this.MVLVLNAME.textContent = name;
            const records:any = await this.loadRecords(String(id));
            const rlines:Array<string> = records.split('\n') as Array<string>;
            rlines.pop();

            this.MVUL.innerHTML = '';

            for(let i = 0; i < rlines.length; i++) {
                const params = rlines[i].split(';');

                const li:HTMLElement = document.createElement('li');
                this.MVUL.appendChild(li);

                const a = document.createElement('a');
                a.textContent = params[0];
                a.href = params[2];
                li.appendChild(a);
            }

            this.MV.classList.add('active');
            this.DIG.classList.add('active');
        });

        const img:HTMLImageElement = document.createElement('img');
        img.src = './assets/img/lvls/' + <string>id + '.png?' + this.getRandomInt(100000, 999999);
        img.alt = '';
        item.appendChild(img);

        const div:HTMLElement = document.createElement('div');
        item.appendChild(div);

        const h2:HTMLElement = document.createElement('h2');
        h2.textContent = this.dli + '. ' + name;
        div.appendChild(h2);

        const p:HTMLElement = document.createElement('p');
        p.textContent = 'by ' + author
        div.appendChild(p);
    }

    private async loadRecords(lvlID:string):Promise<string> {
        return new Promise((resolve, reject) => {
            const xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.open('GET', './demonlist/records.txt?' + this.getRandomInt(0, 999), true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const lines:ReadonlyArray<string> = xhr.responseText.split('\n');
                    let r = '';

                    for(let i = 0; i < lines.length; i++) {
                        if(!lines[i]) continue;

                        if(lines[i].split(';')[1] == String(lvlID)) {
                            r += lines[i] + "\n";
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
    
    private dli:number = 0;
    private MVLVLNAME:HTMLElement;
    private MV:HTMLElement;
    private DIG:HTMLElement;
    private MVUL:HTMLElement;
}

class Demonlist extends DLLIB {
    constructor() {
        super();
        this.loadDemons();
    }

    public loadDemons() {
        const xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.open('GET', './demonlist/demons.txt?' + this.getRandomInt(0, 999), true);

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const lines:ReadonlyArray<string> = xhr.responseText.split('\n');

                for(let i = 0; i < lines.length; i++) {
                    if(!lines[i]) continue;

                    const params:ReadonlyArray<string> = lines[i].split(';');
                    this.addDemon(params[0], params[1], params[2].toString(), params[3]);
                }
            } else {
                console.error('Ошибка при выполнении запроса: ', xhr.statusText);
            }
        }

        xhr.send();
    }
}