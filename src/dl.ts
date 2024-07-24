class DLLIB {
    protected addDemon(name:string, author:string, id:string | number, link:string):void {
        this.dli++;

        const list:HTMLElement = <HTMLElement>document.getElementById('dl');
        const item:HTMLElement  = document.createElement('li');
        item.className = 'dl-item';
        item.onclick = () => location.href = link;
        list.appendChild(item);

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

    public getRandomInt(min:number, max:number):number {
        min = Math.ceil(min);
        max = Math.floor(max);
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    private dli:number = 0;
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
