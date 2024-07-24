"use strict";
class Announcements {
    constructor() {
        this.id = 0;
        this.loadNews();
    }
    loadNews() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './demonlist/news.txt?' + this.getRandomInt(0, 999), true);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const lines = xhr.responseText.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    if (!lines[i])
                        continue;
                    const params = lines[i].split(';');
                    this.addNews(params[0], params[1]);
                }
            }
            else {
                console.error('Ошибка при выполнении запроса: ', xhr.statusText);
            }
        };
        xhr.send();
    }
    addNewsListPost(header) {
        const postsList = document.querySelector('.blog-headers-list');
        const li = document.createElement('li');
        li.className = 'blog-headers-item';
        postsList.appendChild(li);
        const a = document.createElement('a');
        a.href = '#blog-post_' + this.id;
        a.textContent = header;
        li.appendChild(a);
    }
    addNews(header, text) {
        this.id++;
        const blogContent = document.querySelector('.blog-content');
        const post = document.createElement('div');
        post.className = 'blog-post';
        blogContent.appendChild(post);
        const blogHeader = document.createElement('h1');
        blogHeader.textContent = header;
        blogHeader.id = 'blog-post_' + this.id;
        post.appendChild(blogHeader);
        const lines = text.split('/');
        for (let i = 0; i < lines.length; i++) {
            const p = document.createElement('p');
            p.textContent = lines[i];
            post.appendChild(p);
        }
        this.addNewsListPost(header);
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}