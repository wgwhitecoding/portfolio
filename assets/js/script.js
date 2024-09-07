// Dark Mode Toggle using Font Awesome Icon
const darkModeToggle = document.getElementById('darkModeToggle');
const themeIcon = document.getElementById('themeIcon');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Switch between sun and moon icons
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});



