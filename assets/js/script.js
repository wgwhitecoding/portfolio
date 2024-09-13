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

    setTimeout(() => { isScrolling = false; }, 400);
    startSkillsX = null;
});

// Skills Section Dropdown Functionality
const skillsSection = document.getElementById('skills');
const skillsContent = document.getElementById('skillBars'); // Correct ID from HTML
const skillsDropdownToggle = document.getElementById('skillsDropdownToggle'); // The toggle button
let isSkillsOpen = false;
let isAnimating = false;

// Toggle skills section on click with rotation and bounce
skillsDropdownToggle.addEventListener('click', () => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    if (!isSkillsOpen) {
        openSkillSection();
    } else {
        closeSkillSection();
    }
    isSkillsOpen = !isSkillsOpen;
});

function openSkillSection() {
    isAnimating = true;
    skillsContent.style.display = 'block';
    skillsContent.style.maxHeight = skillsContent.scrollHeight + 'px';
    skillsContent.style.opacity = '1';
    skillsDropdownToggle.querySelector('i').classList.add('rotate-arrow');
    staggerSkills();
    setTimeout(() => {
        skillsContent.style.maxHeight = 'none'; // Remove max-height restriction after it's fully opened
        isAnimating = false;
    }, 800);
}

function closeSkillSection() {
    isAnimating = true;
    skillsContent.style.maxHeight = skillsContent.scrollHeight + 'px';
    setTimeout(() => {
        skillsContent.style.maxHeight = '0';
        skillsContent.style.opacity = '0';
        skillsDropdownToggle.querySelector('i').classList.remove('rotate-arrow');
        isSkillsOpen = false;
    }, 10);
    setTimeout(() => {
        skillsContent.style.display = 'none'; // Hide it after collapse
        isAnimating = false;
    }, 600);
}

function staggerSkills() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.opacity = '1';
            bar.style.transform = 'translateY(0)';
            bar.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        }, 100);
    });
}

// Auto-collapse skills section when scrolling away
window.addEventListener('scroll', () => {
    const skillsRect = skillsSection.getBoundingClientRect();
    if (skillsRect.top < 0 || skillsRect.bottom > window.innerHeight) {
        if (isSkillsOpen && !isAnimating) {
            closeSkillSection();
        }
    }
});

// Handle scrolling for credentials carousel
const credContainer = document.getElementById('scroll-container-cred');
const credLeft = document.getElementById('scroll-left-cred');
const credRight = document.getElementById('scroll-right-cred');

// Scroll left
credLeft.addEventListener('click', () => {
    credContainer.scrollBy({
        left: -300,  // Adjust scroll amount based on card size
        behavior: 'smooth'
    });
});

// Scroll right
credRight.addEventListener('click', () => {
    credContainer.scrollBy({
        left: 300,  // Adjust scroll amount based on card size
        behavior: 'smooth'
    });
});

// Swipe functionality for credentials carousel
let startCredX;

credContainer.addEventListener('touchstart', (e) => {
    startCredX = e.touches[0].clientX;
});

credContainer.addEventListener('touchmove', (e) => {
    if (!startCredX) return;
    const diffX = startCredX - e.touches[0].clientX;

    if (diffX > 50) {
        credRight.click();
    } else if (diffX < -50) {
        credLeft.click();
    }
    startCredX = null;
});
