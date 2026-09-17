let objects = [];

// Загрузка объектов
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        objects = data.objects || [];
        renderList();
    })
    .catch(() => {
        objects = [];
        renderList();
    });

// Отображение списка
function renderList() {
    const list = document.getElementById('adminList');
    list.innerHTML = '';

    if (objects.length === 0) {
        list.innerHTML = '<p>Пока нет объектов.</p>';
        return;
    }

    objects.forEach((obj, index) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${obj.image}" alt="${obj.title}">
            <h3>${obj.title}</h3>
            <p>${obj.address}</p>
            <p class="price">${obj.price}</p>
            <button onclick="deleteObject(${index})">🗑 Удалить</button>
        `;
        list.appendChild(div);
    });
}

// Добавление объекта
document.getElementById('objectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newObj = {
        id: Date.now(),
        title: document.getElementById('title').value,
        address: document.getElementById('address').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value || 'https://via.placeholder.com/300x200'
    };

    objects.push(newObj);
    renderList();
    this.reset();
    alert('Объект добавлен! Не забудь скачать data.json.');
});

// Удаление объекта
function deleteObject(index) {
    if (confirm('Удалить объект?')) {
        objects.splice(index, 1);
        renderList();
        alert('Объект удалён. Не забудь скачать data.json.');
    }
}

// Скачивание data.json
document.getElementById('downloadBtn').addEventListener('click', function() {
    const data = JSON.stringify({ objects }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
});
