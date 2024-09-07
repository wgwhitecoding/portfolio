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

// Get the width of one project card dynamically
const projectCard = document.querySelector('.project-card');
let cardWidth = projectCard.offsetWidth + 40; // Add margin/padding (adjust 40px as needed)

// Recalculate card width on window resize to maintain responsiveness
window.addEventListener('resize', () => {
    cardWidth = projectCard.offsetWidth + 40; // Recalculate card width when window resizes
});

// Scroll left
scrollLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: -cardWidth, // Scroll by one full project card
        behavior: 'smooth'
    });
});

// Scroll right
scrollRight.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: cardWidth, // Scroll by one full project card
        behavior: 'smooth'
    });
});




