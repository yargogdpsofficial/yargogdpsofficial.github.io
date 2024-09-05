class Header {
    constructor() {
        const header:HTMLElement = <HTMLElement>document.getElementById('header');
        const hcontainer:HTMLElement = document.createElement('div');
        hcontainer.className = 'container-900px';
        header.appendChild(hcontainer);

        const hbody:HTMLElement = document.createElement('div');
        hbody.className = 'header-body';
        hcontainer.appendChild(hbody);

        const hlogo:HTMLElement = document.createElement('div');
        hlogo.className = 'header-logo';
        hbody.appendChild(hlogo);

        const hlogoLink = document.createElement('a');
        hlogoLink.href = '/';
        hlogo.appendChild(hlogoLink);

        const hlogoImg:HTMLImageElement = document.createElement('img');
        hlogoImg.src = './assets/img/logo/main.png';
        hlogoImg.alt = '';
        hlogoLink.appendChild(hlogoImg);

        const hlogoP:HTMLElement = document.createElement('h4');
        hlogoP.textContent = 'YarGoGDPS';
        hlogoLink.appendChild(hlogoP);

        const hnav:HTMLElement = document.createElement('div');
        hnav.className = 'header-nav';
        hnav.id = 'menu';
        hbody.appendChild(hnav);

        const hnavtrue:HTMLElement = document.createElement('nav');
        hnav.appendChild(hnavtrue);

        this.hnavlist = document.createElement('ul');
        this.hnavlist.className = 'header-list';
        hnavtrue.appendChild(this.hnavlist);

        for(let i = 0; i < this.linksUrl.length; i++) this.addHeaderLink(this.linksUrl[i].url, this.linksUrl[i].linkName);

        const hlogin:HTMLElement = document.createElement('li');
        hlogin.className = 'header-log';
        hlogin.id = 'auth-link';
        this.hnavlist.appendChild(hlogin);

        const dwnl:HTMLElement = document.createElement('p');
        dwnl.id = 'auth-p';
        dwnl.textContent = 'Скачать';
        dwnl.addEventListener('click', () => location.href = 'https://gofruit.space/gdps/053m');
        hlogin.appendChild(dwnl);

        const hhamburger:HTMLElement = document.createElement('div');
        hhamburger.className = 'hamburger';
        hhamburger.id = 'hamburger';
        hbody.appendChild(hhamburger);

        const hhamburgerSpan:HTMLElement = document.createElement('span');
        hhamburger.appendChild(hhamburgerSpan);
    }

    private addHeaderLink(href: string, str: string):void {
        const li:HTMLElement = document.createElement('li');
        this.hnavlist.appendChild(li);

        const a = document.createElement('a');
        a.textContent = str;
        a.href = href;
        li.appendChild(a);

        const hr:HTMLElement = document.createElement('hr');
        li.appendChild(hr);
    }

    private hnavlist:HTMLElement;
    private linksUrl:ReadonlyArray<any> = [
        { linkName: 'Главная', url: './' },
        { linkName: 'Новости', url: './news.html' },
        { linkName: 'Демонлист', url: './dl.html' },
    ];
}

const header = new Header();
