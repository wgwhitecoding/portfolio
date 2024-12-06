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
// Skills Carousel for Small Devices (unchanged)
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
// Project Carousel (Scroll into View approach)
// =========================
const scrollContainer = document.getElementById("scroll-container");
const scrollLeft = document.getElementById("scroll-left");
const scrollRight = document.getElementById("scroll-right");

if (scrollContainer && scrollLeft && scrollRight) {
  const projectCards = scrollContainer.querySelectorAll(".project-card");
  let currentProjectIndex = 0;

  scrollRight.addEventListener("click", () => {
    if (currentProjectIndex < projectCards.length - 1) {
      currentProjectIndex++;
      projectCards[currentProjectIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  });

  scrollLeft.addEventListener("click", () => {
    if (currentProjectIndex > 0) {
      currentProjectIndex--;
      projectCards[currentProjectIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  });

  // Touch-based swipe support
  let startX;
  scrollContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  scrollContainer.addEventListener("touchmove", (e) => {
    if (!startX) return;
    const diffX = startX - e.touches[0].clientX;
    if (diffX > 50 && currentProjectIndex < projectCards.length - 1) {
      currentProjectIndex++;
      projectCards[currentProjectIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
      startX = null;
    } else if (diffX < -50 && currentProjectIndex > 0) {
      currentProjectIndex--;
      projectCards[currentProjectIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
      startX = null;
    }
  });
}

// =========================
// Blog Carousel (Scroll into View approach)
// =========================
const blogContainer = document.getElementById("scroll-container-blog");
const blogLeft = document.getElementById("scroll-left-blog");
const blogRight = document.getElementById("scroll-right-blog");

if (blogContainer && blogLeft && blogRight) {
  const blogCards = blogContainer.querySelectorAll(".blog-card");
  let currentBlogIndex = 0;

  blogRight.addEventListener("click", () => {
    if (currentBlogIndex < blogCards.length - 1) {
      currentBlogIndex++;
      blogCards[currentBlogIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  });

  blogLeft.addEventListener("click", () => {
    if (currentBlogIndex > 0) {
      currentBlogIndex--;
      blogCards[currentBlogIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  });

  // Touch-based swipe support for blog
  let startBlogX;
  blogContainer.addEventListener("touchstart", (e) => {
    startBlogX = e.touches[0].clientX;
  });

  blogContainer.addEventListener("touchmove", (e) => {
    if (!startBlogX) return;
    const diffX = startBlogX - e.touches[0].clientX;
    if (diffX > 50 && currentBlogIndex < blogCards.length - 1) {
      currentBlogIndex++;
      blogCards[currentBlogIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
      startBlogX = null;
    } else if (diffX < -50 && currentBlogIndex > 0) {
      currentBlogIndex--;
      blogCards[currentBlogIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
      startBlogX = null;
    }
  });
}

// =========================
// Credentials Carousel (unchanged, using generic scroll approach or can adapt similarly)
// =========================
const credentialsCarousel = document.getElementById("scroll-container-cred");
const credLeftArrow = document.getElementById("scroll-left-cred");
const credRightArrow = document.getElementById("scroll-right-cred");

function handleArrowScroll(container, leftArrow, rightArrow, step = null) {
  if (!container || !leftArrow || !rightArrow) return;
  const scrollStep = step || container.clientWidth;

  leftArrow.addEventListener("click", () => {
    container.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", () => {
    container.scrollBy({ left: scrollStep, behavior: "smooth" });
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

if (credentialsCarousel && credLeftArrow && credRightArrow) {
  handleArrowScroll(credentialsCarousel, credLeftArrow, credRightArrow);
}

// =========================
// Skill Bar Animation (Full-Stack and Data Engineering)
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

document.addEventListener("DOMContentLoaded", animateSkillBars);













