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

// Scroll Arrows Functionality for Project Carousel (unchanged)
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

// Swipe functionality for project carousel (unchanged)
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

// Skills Carousel Arrows Functionality (new - for small devices only)
const skillsCarousel = document.getElementById('skillsCarousel');
const skillsLeftArrow = document.getElementById('skills-left');
const skillsRightArrow = document.getElementById('skills-right');

// Scroll one skill logo at a time
skillsLeftArrow.addEventListener('click', () => {
    skillsCarousel.scrollBy({
        left: -skillsCarousel.clientWidth / 2, // Scroll by half the container's width
        behavior: 'smooth'
    });
});

skillsRightArrow.addEventListener('click', () => {
    skillsCarousel.scrollBy({
        left: skillsCarousel.clientWidth / 2, // Scroll by half the container's width
        behavior: 'smooth'
    });
});

// Swipe functionality for skills carousel on small devices
let startSkillsX;

skillsCarousel.addEventListener('touchstart', (e) => {
    startSkillsX = e.touches[0].clientX;
});

skillsCarousel.addEventListener('touchmove', (e) => {
    if (!startSkillsX) return;
    const diffX = startSkillsX - e.touches[0].clientX;

    if (diffX > 50) {
        skillsRightArrow.click(); // Swipe left (show next skill)
    } else if (diffX < -50) {
        skillsLeftArrow.click(); // Swipe right (show previous skill)
    }
    startSkillsX = null;
});










