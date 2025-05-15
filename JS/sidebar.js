const menuBtn = document.getElementById('menuBtn');
const menu_desktopBtn = document.getElementById('menuBtn-desktop');
const sidebar = document.querySelector('.sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

menu_desktopBtn.addEventListener('click', () => {
    sidebar.classList.toggle('small');
});