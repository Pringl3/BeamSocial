const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.close');
let isOpen = true

sidebarToggle.addEventListener('click', () => {
    if (isOpen) {
        sidebar.classList.add('close');
        isOpen = false;
    } else {
        sidebar.classList.remove('close');
        isOpen = true;
    }
});