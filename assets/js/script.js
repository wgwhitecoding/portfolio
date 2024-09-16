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

// Skill Bar Animation with Percentage Increase
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar .progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                const skillPercentageElem = progressBar.querySelector('.skill-percentage');
                const finalValue = parseInt(percentage, 10);
                let currentPercentage = 0;

                // Animate the bar width
                progressBar.style.transition = "width 3s ease";  // Slow down the animation speed
                progressBar.style.width = percentage;

                // Animate the percentage text to increase with the bar
                const interval = setInterval(() => {
                    currentPercentage++;
                    skillPercentageElem.textContent = currentPercentage + '%';

                    if (currentPercentage >= finalValue) {
                        clearInterval(interval);
                    }
                }, 30);  // Adjust this value to control how fast the percentage increases

                observer.unobserve(progressBar);  // Stop observing once animated
            }
        });
    }, { threshold: 0.5 });  // Trigger when 50% of the skill bar is visible

    skillBars.forEach(bar => {
        bar.style.width = '0%';  // Start at 0%
        observer.observe(bar);
    });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', animateSkillBars);

// Function to open the CanDo project modal
function openCanDoModal() {
    var candoModal = new bootstrap.Modal(document.getElementById('projectModal1'));
    candoModal.show();
}

// Add event listener to the Django Skill Bar
document.getElementById('djangoSkillBar').addEventListener('click', openCanDoModal);

// Add event listener to the 3D Django Skill Item
document.getElementById('djangoSkill3D').addEventListener('click', openCanDoModal);

// Add event listener to the SQL Skill Bar
document.getElementById('sqlSkillBar').addEventListener('click', openCanDoModal);

// Add event listener to the 3D SQL Skill Item
document.getElementById('sqlSkill3D').addEventListener('click', openCanDoModal);
