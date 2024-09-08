// Dark Mode Toggle with LocalStorage
const darkModeToggle = document.getElementById('darkModeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check for saved user preference in localStorage
const isDarkMode = localStorage.getItem('dark-mode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Switch between sun and moon icons
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('dark-mode', 'true');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('dark-mode', 'false');
    }
});

// Scroll Arrows Functionality for Project Carousel
const scrollContainer = document.getElementById('scroll-container');
const scrollLeft = document.getElementById('scroll-left');
const scrollRight = document.getElementById('scroll-right');

// Scroll one project at a time
scrollLeft.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: -scrollContainer.clientWidth,
        behavior: 'smooth'
    });
});

scrollRight.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: scrollContainer.clientWidth,
        behavior: 'smooth'
    });
});

// Swipe functionality for project carousel
let startX;

scrollContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

scrollContainer.addEventListener('touchmove', (e) => {
    if (!startX) return;
    const diffX = startX - e.touches[0].clientX;

    if (diffX > 50) {
        scrollRight.click();
    } else if (diffX < -50) {
        scrollLeft.click();
    }
    startX = null;
});

// Skills Carousel Arrows Functionality for small devices
const skillsCarousel = document.getElementById('skillsCarousel');
const skillsLeftArrow = document.getElementById('skills-left');
const skillsRightArrow = document.getElementById('skills-right');

// Scroll one skill logo at a time
skillsLeftArrow.addEventListener('click', () => {
    skillsCarousel.scrollBy({
        left: -window.innerWidth / 2,
        behavior: 'smooth'
    });
});

skillsRightArrow.addEventListener('click', () => {
    skillsCarousel.scrollBy({
        left: window.innerWidth / 2,
        behavior: 'smooth'
    });
});

// Swipe functionality for skills carousel on small devices with throttling
let startSkillsX;
let isScrolling = false;

skillsCarousel.addEventListener('touchstart', (e) => {
    startSkillsX = e.touches[0].clientX;
});

skillsCarousel.addEventListener('touchmove', (e) => {
    if (isScrolling) return;

    const diffX = startSkillsX - e.touches[0].clientX;

    if (diffX > 50) {
        skillsRightArrow.click();
        isScrolling = true;
    } else if (diffX < -50) {
        skillsLeftArrow.click();
        isScrolling = true;
    }

    setTimeout(() => { isScrolling = false }, 400);
    startSkillsX = null;
});

// Skills Section Dropdown Functionality
const skillsSection = document.getElementById('skills');
const skillsContent = document.getElementById('skillBars'); // Correct ID from HTML
const skillsDropdownToggle = document.getElementById('skillsDropdownToggle'); // The toggle button
let isSkillsOpen = false;

// Toggle skills section on click
skillsDropdownToggle.addEventListener('click', () => {
    if (!isSkillsOpen) {
        skillsContent.style.display = "flex"; // Show the skill bars in a flex container
        skillsDropdownToggle.querySelector('i').classList.remove('fa-chevron-down');
        skillsDropdownToggle.querySelector('i').classList.add('fa-chevron-up');
    } else {
        closeSkillSection(); // Close using function to ensure proper closure
    }
    isSkillsOpen = !isSkillsOpen;
});

// Function to fully close the skill section
function closeSkillSection() {
    skillsContent.style.display = "none"; // Fully hide the skill bars
    skillsDropdownToggle.querySelector('i').classList.remove('fa-chevron-up');
    skillsDropdownToggle.querySelector('i').classList.add('fa-chevron-down');
    isSkillsOpen = false;
}

// Auto-collapse skills section when scrolling away
window.addEventListener('scroll', () => {
    const skillsRect = skillsSection.getBoundingClientRect();
    const isSkillsVisible = skillsRect.top >= 0 && skillsRect.bottom <= window.innerHeight;

    if (!isSkillsVisible && isSkillsOpen) {
        closeSkillSection(); // Ensure full closure when scrolling away
    }
});
