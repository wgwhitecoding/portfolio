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

if (darkModeToggle) {
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
}

// Scroll Arrows Functionality for Project Carousel
const scrollContainer = document.getElementById('scroll-container');
const scrollLeft = document.getElementById('scroll-left');
const scrollRight = document.getElementById('scroll-right');

if (scrollContainer && scrollLeft && scrollRight) {
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
}

// Skills Carousel Arrows Functionality for small devices
const skillsCarousel = document.getElementById('skillsCarousel');
const skillsLeftArrow = document.getElementById('skills-left');
const skillsRightArrow = document.getElementById('skills-right');

if (skillsCarousel && skillsLeftArrow && skillsRightArrow) {
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
}

// Handle scrolling for blog carousel
const blogContainer = document.getElementById('scroll-container-blog');
const blogLeft = document.getElementById('scroll-left-blog');
const blogRight = document.getElementById('scroll-right-blog');

if (blogContainer && blogLeft && blogRight) {
    // Scroll left
    blogLeft.addEventListener('click', () => {
        blogContainer.scrollBy({
            left: -430, // Matches card width
            behavior: 'smooth'
        });
    });

    // Scroll right
    blogRight.addEventListener('click', () => {
        blogContainer.scrollBy({
            left: 430, // Matches card width
            behavior: 'smooth'
        });
    });

    // Swipe functionality for blog carousel
    let startBlogX;

    blogContainer.addEventListener('touchstart', (e) => {
        startBlogX = e.touches[0].clientX;
    });

    blogContainer.addEventListener('touchmove', (e) => {
        if (!startBlogX) return;
        const diffX = startBlogX - e.touches[0].clientX;

        if (diffX > 50) {
            blogRight.click();
        } else if (diffX < -50) {
            blogLeft.click();
        }
        startBlogX = null;
    });
}

// Skill Bar Animation for Full-Stack and Data Engineering Sections
function animateSkillBars() {
    const fullStackSkillBars = document.querySelectorAll('#fullStackSkillBars .progress');
    const dataEngSkillBars = document.querySelectorAll('#dataEngSkillBars .progress');

    const animateBars = (bars) => {
        bars.forEach((progressBar) => {
            const percentage = progressBar.getAttribute('data-percentage');
            const skillPercentageElem = progressBar.querySelector('.skill-percentage');
            const finalValue = parseInt(percentage, 10);
            let currentPercentage = 0;

            // Animate the bar width
            progressBar.style.transition = "width 3s ease";
            progressBar.style.width = percentage;

            // Animate the percentage text to increase with the bar
            const interval = setInterval(() => {
                currentPercentage++;
                skillPercentageElem.textContent = currentPercentage + '%';

                if (currentPercentage >= finalValue) {
                    clearInterval(interval);
                }
            }, 30); // Adjust this value to control the percentage animation speed
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionBars = entry.target.querySelectorAll('.progress');
                animateBars(sectionBars);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('fullStackSkillBars'));
    observer.observe(document.getElementById('dataEngSkillBars'));
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', animateSkillBars);

// Function to open the CanDo project modal
function openCanDoModal() {
    const candoModal = new bootstrap.Modal(document.getElementById('projectModal1'));
    candoModal.show();
}

// Add event listeners to the Django Skill Bar and Items
const djangoSkillBar = document.getElementById('djangoSkillBar');
const djangoSkill3D = document.getElementById('djangoSkill3D');
if (djangoSkillBar && djangoSkill3D) {
    djangoSkillBar.addEventListener('click', openCanDoModal);
    djangoSkill3D.addEventListener('click', openCanDoModal);
}

// Add event listeners to the SQL Skill Bar and Items
const sqlSkillBar = document.getElementById('sqlSkillBar');
const sqlSkill3D = document.getElementById('sqlSkill3D');
if (sqlSkillBar && sqlSkill3D) {
    sqlSkillBar.addEventListener('click', openCanDoModal);
    sqlSkill3D.addEventListener('click', openCanDoModal);
}



