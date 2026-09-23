// Загрузка объектов из data.json
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById('objectsList');
        list.innerHTML = '';
        data.objects.forEach(obj => {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `
                <img src="${obj.image}" alt="${obj.title}">
                <div class="card-body">
                    <h3>${obj.title}</h3>
                    <p>${obj.address}</p>
                    <p class="price">${obj.price}</p>
                    <p class="desc">${obj.description}</p>
                </div>
            `;
            list.appendChild(div);
        });
    })
    .catch(() => console.log('Нет данных для объектов'));

// Обработка формы обратного звонка
document.getElementById('callbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо! Я перезвоню в течение 15 минут.');
    this.reset();
});
// Плавное появление блоков при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

document.querySelectorAll('section').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});
// Фиксация меню при скролле
const nav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
