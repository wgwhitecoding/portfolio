// =========================
// Dark Mode Toggle with LocalStorage
// =========================
const darkModeToggle = document.getElementById("darkModeToggle");
const themeIcon = document.getElementById("themeIcon");

// Check for saved user preference in localStorage and apply on load
const isDarkMode = localStorage.getItem("dark-mode") === "true";
if (isDarkMode) {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
} else {
  document.body.classList.remove("dark-mode");
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
}

// Toggle dark mode and update localStorage
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("dark-mode", "true");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("dark-mode", "false");
    }
  });
}

// =========================
// Navbar Smooth Scrolling After Collapse
// =========================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    const targetID = this.getAttribute('href');

    // Only handle internal hash links
    if (targetID && targetID.startsWith('#') && targetID.length > 1) {
      event.preventDefault();
      const targetElement = document.querySelector(targetID);

      const scrollAfterCollapse = () => {
        navbarCollapse.removeEventListener('hidden.bs.collapse', scrollAfterCollapse);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      // If navbar is open on mobile, collapse first, then scroll
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.addEventListener('hidden.bs.collapse', scrollAfterCollapse);
        navbarToggler.click();
      } else {
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // For external or non-hash links, just close menu if open
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    }
  });
});

// =========================
// Horizontal Scrolling with Arrows & Swipe (Generic Functions)
// =========================
function handleArrowScroll(container, leftArrow, rightArrow, cardSelector) {
  if (!container || !leftArrow || !rightArrow) return;

  const getScrollStep = () => {
    const card = container.querySelector(cardSelector);
    if (!card) return container.clientWidth;
    const cardWidth = card.offsetWidth;
    const cardMarginRight = parseInt(getComputedStyle(card).marginRight) || 0;
    const cardMarginLeft = parseInt(getComputedStyle(card).marginLeft) || 0;
    return cardWidth + cardMarginRight + cardMarginLeft; // Include card width and margins
  };

  leftArrow.addEventListener("click", () => {
    container.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });

  rightArrow.addEventListener("click", () => {
    container.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });

  // Touch-based swipe support
  let startX;
  container.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchmove", (e) => {
    if (!startX) return;
    const diffX = startX - e.touches[0].clientX;

    if (diffX > 50) {
      rightArrow.click();
      startX = null;
    } else if (diffX < -50) {
      leftArrow.click();
      startX = null;
    }
  });
}

// =========================
// Determine Steps Based on Screen Size
// (Retained in case you use it elsewhere)
// =========================
let blogStep, projectStep;
if (window.innerWidth < 768) {
  // On small screens, 1 card at a time (e.g., 430px)
  blogStep = 430;
  projectStep = 430;
} else {
  // On larger screens, multiple cards at once (e.g., 1290px)
  blogStep = 1290;
  projectStep = 1290;
}

// =========================
// Project Carousel
// =========================
const scrollContainer = document.getElementById("scroll-container");
const scrollLeft = document.getElementById("scroll-left");
const scrollRight = document.getElementById("scroll-right");
handleArrowScroll(scrollContainer, scrollLeft, scrollRight, ".project-card");

// =========================
// Skills Carousel for Small Devices
// (No changes, remains as is)
// =========================
const skillsCarousel = document.getElementById("skillsCarousel");
const skillsLeftArrow = document.getElementById("skills-left");
const skillsRightArrow = document.getElementById("skills-right");

if (skillsCarousel && skillsLeftArrow && skillsRightArrow) {
  const skillsStep = window.innerWidth / 2;

  skillsLeftArrow.addEventListener("click", () => {
    skillsCarousel.scrollBy({ left: -skillsStep, behavior: "smooth" });
  });

  skillsRightArrow.addEventListener("click", () => {
    skillsCarousel.scrollBy({ left: skillsStep, behavior: "smooth" });
  });

  let startSkillsX;
  let isScrolling = false;

  skillsCarousel.addEventListener("touchstart", (e) => {
    startSkillsX = e.touches[0].clientX;
  });

  skillsCarousel.addEventListener("touchmove", (e) => {
    if (isScrolling || startSkillsX == null) return;
    const diffX = startSkillsX - e.touches[0].clientX;

    if (diffX > 50) {
      skillsRightArrow.click();
      isScrolling = true;
    } else if (diffX < -50) {
      skillsLeftArrow.click();
      isScrolling = true;
    }

    setTimeout(() => {
      isScrolling = false;
    }, 400);
    startSkillsX = null;
  });
}

// =========================
// Disable Clicks for 3D Carousel Skill Items (If Applicable)
// =========================
const skillItems = document.querySelectorAll(".skills-carousel .skill-item");
skillItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

// =========================
// Blog Carousel
// =========================
const blogContainer = document.getElementById("scroll-container-blog");
const blogLeft = document.getElementById("scroll-left-blog");
const blogRight = document.getElementById("scroll-right-blog");

if (blogContainer && blogLeft && blogRight) {
  handleArrowScroll(blogContainer, blogLeft, blogRight, ".blog-card");

  let startBlogX;
  blogContainer.addEventListener("touchstart", (e) => {
    startBlogX = e.touches[0].clientX;
  });

  blogContainer.addEventListener("touchmove", (e) => {
    if (!startBlogX) return;
    const diffX = startBlogX - e.touches[0].clientX;

    if (diffX > 50) {
      blogRight.click();
      startBlogX = null;
    } else if (diffX < -50) {
      blogLeft.click();
      startBlogX = null;
    }
  });
}

// =========================
// Credentials Carousel
// (No changes, remains as is)
// =========================
const credentialsCarousel = document.getElementById("scroll-container-cred");
const credLeftArrow = document.getElementById("scroll-left-cred");
const credRightArrow = document.getElementById("scroll-right-cred");

if (credentialsCarousel && credLeftArrow && credRightArrow) {
  handleArrowScroll(credentialsCarousel, credLeftArrow, credRightArrow, ".credential-card"); // Adjust selector if needed

  let startCredX;
  credentialsCarousel.addEventListener("touchstart", (e) => {
    startCredX = e.touches[0].clientX;
  });

  credentialsCarousel.addEventListener("touchmove", (e) => {
    if (!startCredX) return;
    const diffX = startCredX - e.touches[0].clientX;

    if (diffX > 50) {
      credRightArrow.click();
    } else if (diffX < -50) {
      credLeftArrow.click();
    }
    startCredX = null;
  });
}

// =========================
// Skill Bar Animation (Full-Stack and Data Engineering) using requestAnimationFrame
// =========================
function animateSkillBars() {
  const animateBars = (bars) => {
    bars.forEach((progressBar) => {
      const percentage = parseInt(progressBar.getAttribute("data-percentage"), 10);
      const skillPercentageElem = progressBar.querySelector(".skill-percentage");

      // Smooth width transition
      progressBar.style.transition = "width 3s ease";
      progressBar.style.width = percentage + '%';

      const startTime = performance.now();
      const duration = 3000; // 3 seconds

      function update(now) {
        const elapsed = now - startTime;
        const fraction = Math.min(elapsed / duration, 1);
        const currentPercentage = Math.floor(percentage * fraction);
        skillPercentageElem.textContent = currentPercentage + "%";

        if (fraction < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionBars = entry.target.querySelectorAll(".progress");
        // Slight delay if needed for layout stability (100ms)
        setTimeout(() => {
          animateBars(sectionBars);
          observer.unobserve(entry.target);
        }, 100);
      }
    });
  }, { threshold: 0.5 });

  const fullStackSection = document.getElementById("fullStackSkillBars");
  const dataEngSection = document.getElementById("dataEngSkillBars");

  if (fullStackSection) observer.observe(fullStackSection);
  if (dataEngSection) observer.observe(dataEngSection);
}

// Initialize skill bar animations as soon as DOM is ready
document.addEventListener("DOMContentLoaded", animateSkillBars);











