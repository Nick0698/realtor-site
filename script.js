// Обработка формы
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо! Я свяжусь с вами в ближайшее время.');
    this.reset();
});
