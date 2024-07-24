class Footer {
    constructor() {
        const footer:HTMLElement = <HTMLElement>document.getElementById('footer');
        const fcontainer = document.createElement('div');
        fcontainer.className = 'container-900px';
        footer.appendChild(fcontainer);
        
        const fbody:HTMLElement = document.createElement('div');
        fbody.className = 'footer-body';
        fcontainer.appendChild(fbody);
        
        const fcolumns:HTMLElement = document.createElement('div');
        fcolumns.className = 'footer-columns';
        fbody.appendChild(fcolumns);
        
        const fcolumn1:HTMLElement = document.createElement('div');
        fcolumn1.className = 'footer-column';
        fcolumns.appendChild(fcolumn1);
        
        const fcolumn1header:HTMLElement = document.createElement('h3');
        fcolumn1header.textContent = 'Команда';
        fcolumn1.appendChild(fcolumn1header);
        
        this.addFooterLink(fcolumn1, '#', 'О нас');
        this.addFooterLink(fcolumn1, '#', 'GitHub');
        
        const fcolumn2:HTMLElement = document.createElement('div');
        fcolumn2.className = 'footer-column';
        fcolumns.appendChild(fcolumn2);
        
        const fcolumn2header:HTMLElement = document.createElement('h3');
        fcolumn2header.textContent = 'Приватный сервер';
        fcolumn2.appendChild(fcolumn2header);
        
        this.addFooterLink(fcolumn2, './updates.html', 'Обновления');
        this.addFooterLink(fcolumn2, 'https://discord.gg/8ETWhDsSKH', 'Дискорд');
        this.addFooterLink(fcolumn2, 'https://gofruit.space/gdps/053m', 'Скачать');
        
        const copyright:HTMLElement = document.createElement('div');
        fbody.appendChild(copyright);
        
        const copyrighth3:HTMLElement = document.createElement('h3');
        copyrighth3.textContent = 'YarGo © 2024';
        copyright.appendChild(copyrighth3);
    }

    private addFooterLink(column:HTMLElement, href:string, str:string) {
        const p:HTMLElement = document.createElement('p');
        column.appendChild(p);
    
        const a = document.createElement('a');
        a.textContent = str;
        a.href = href;
        a.target = '_blank';
        p.appendChild(a);
    }
}

const footer = new Footer();