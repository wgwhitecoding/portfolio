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

// Scroll Arrows Functionality
const scrollContainer = document.getElementById('scroll-container');
const scrollLeft = document.getElementById('scroll-left');
const scrollRight = document.getElementById('scroll-right');

// Scroll one project at a time
scrollLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: -scrollContainer.clientWidth, // Scroll the width of one project
        behavior: 'smooth'
    });
});

scrollRight.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: scrollContainer.clientWidth, // Scroll the width of one project
        behavior: 'smooth'
    });
});

// Swipe functionality for small devices
let startX;

scrollContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

scrollContainer.addEventListener('touchmove', (e) => {
    if (!startX) return;
    const diffX = startX - e.touches[0].clientX;

    if (diffX > 50) {
        scrollRight.click(); // Swipe left (show next project)
    } else if (diffX < -50) {
        scrollLeft.click(); // Swipe right (show previous project)
    }
    startX = null;
});





