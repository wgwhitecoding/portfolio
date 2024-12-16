document.addEventListener("DOMContentLoaded", () => {

  /* 
  ===========================================================================
  =======================   DARK MODE TOGGLE   ==============================
  ===========================================================================
  */
  const darkModeToggle = document.getElementById("darkModeToggle");
  const themeIcon = document.getElementById("themeIcon");

  // Check for saved user preference in localStorage
  const isDarkMode = localStorage.getItem("dark-mode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    document.body.classList.remove("dark-mode");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }

  // Dark Mode Event
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("dark-mode", "true");
      } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("dark-mode", "false");
      }
    });
  }

  /* 
  ===========================================================================
  ====================   NAVBAR COLLAPSE ON CLICK   =========================
  ===========================================================================
  */
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (navbarCollapse.classList.contains("show")) {
        e.preventDefault();
        const targetSectionId = link.getAttribute("href");
        navbarToggler.click();

        setTimeout(() => {
          if (targetSectionId.startsWith("#")) {
            const targetSection = document.querySelector(targetSectionId);
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: "smooth" });
            }
          }
        }, 300);
      }
    });
  });

  /* 
  ===========================================================================
  ====================   PROJECTS CAROUSEL ARROWS   =========================
  ===========================================================================
  */
  const scrollContainer = document.getElementById("scroll-container");
  const scrollLeft = document.getElementById("scroll-left");
  const scrollRight = document.getElementById("scroll-right");

  if (scrollContainer && scrollLeft && scrollRight) {
    scrollLeft.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: -scrollContainer.clientWidth, behavior: "smooth" });
    });

    scrollRight.addEventListener("click", () => {
      scrollContainer.scrollBy({ left: scrollContainer.clientWidth, behavior: "smooth" });
    });

    let startX;
    scrollContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    scrollContainer.addEventListener("touchmove", (e) => {
      if (!startX) return;
      const diffX = startX - e.touches[0].clientX;
      if (diffX > 50) scrollRight.click();
      else if (diffX < -50) scrollLeft.click();
      startX = null;
    });
  }

  /* 
  ===========================================================================
  ======================   SKILLS CAROUSEL ARROWS   =========================
  ===========================================================================
  */
  const skillsCarousel = document.getElementById("skillsCarousel");
  const skillsLeftArrow = document.getElementById("skills-left");
  const skillsRightArrow = document.getElementById("skills-right");

  if (skillsCarousel && skillsLeftArrow && skillsRightArrow) {
    skillsLeftArrow.addEventListener("click", () => {
      skillsCarousel.scrollBy({ left: -window.innerWidth / 2, behavior: "smooth" });
    });
    skillsRightArrow.addEventListener("click", () => {
      skillsCarousel.scrollBy({ left: window.innerWidth / 2, behavior: "smooth" });
    });

    let startSkillsX;
    let isScrolling = false;

    skillsCarousel.addEventListener("touchstart", (e) => {
      startSkillsX = e.touches[0].clientX;
    });

    skillsCarousel.addEventListener("touchmove", (e) => {
      if (isScrolling) return;
      const diffX = startSkillsX - e.touches[0].clientX;
      if (diffX > 50) { skillsRightArrow.click(); isScrolling = true; }
      else if (diffX < -50) { skillsLeftArrow.click(); isScrolling = true; }

      setTimeout(() => { isScrolling = false; }, 400);
      startSkillsX = null;
    });
  }

  // Disable Clicks for 3D Skill Items
  const skillItems = document.querySelectorAll(".skills-carousel .skill-item");
  skillItems.forEach((item) => {
    item.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); });
  });

  /* 
  ===========================================================================
  ======================   BLOG CAROUSEL ARROWS   ===========================
  ===========================================================================
  */
  const blogContainer = document.getElementById("scroll-container-blog");
  const blogLeft = document.getElementById("scroll-left-blog");
  const blogRight = document.getElementById("scroll-right-blog");

  if (blogContainer && blogLeft && blogRight) {
    blogLeft.addEventListener("click", () => {
      blogContainer.scrollBy({ left: -blogContainer.clientWidth, behavior: "smooth" });
    });

    blogRight.addEventListener("click", () => {
      blogContainer.scrollBy({ left: blogContainer.clientWidth, behavior: "smooth" });
    });

    let startBlogX;
    blogContainer.addEventListener("touchstart", (e) => { startBlogX = e.touches[0].clientX; });
    blogContainer.addEventListener("touchmove", (e) => {
      if (!startBlogX) return;
      const diffX = startBlogX - e.touches[0].clientX;
      if (diffX > 50) blogRight.click();
      else if (diffX < -50) blogLeft.click();
      startBlogX = null;
    });
  }

  /* 
  ===========================================================================
  ====================   CREDENTIALS CAROUSEL ARROWS   ======================
  ===========================================================================
  */
  const credentialsCarousel = document.getElementById("scroll-container-cred");
  const credLeftArrow = document.getElementById("scroll-left-cred");
  const credRightArrow = document.getElementById("scroll-right-cred");

  if (credentialsCarousel && credLeftArrow && credRightArrow) {
    credLeftArrow.addEventListener("click", () => {
      credentialsCarousel.scrollBy({ left: -credentialsCarousel.clientWidth, behavior: "smooth" });
    });

    credRightArrow.addEventListener("click", () => {
      credentialsCarousel.scrollBy({ left: credentialsCarousel.clientWidth, behavior: "smooth" });
    });

    let startCredX;
    credentialsCarousel.addEventListener("touchstart", (e) => {
      startCredX = e.touches[0].clientX;
    });

    credentialsCarousel.addEventListener("touchmove", (e) => {
      if (!startCredX) return;
      const diffX = startCredX - e.touches[0].clientX;
      if (diffX > 50) credRightArrow.click();
      else if (diffX < -50) credLeftArrow.click();
      startCredX = null;
    });
  }

  /* 
  ===========================================================================
  ================   SKILL BAR ANIMATION (FULL-STACK / DATA)   ==============
  ===========================================================================
  */
  function animateSkillBars() {
    const fullStackSkillBars = document.querySelectorAll("#fullStackSkillBars .progress");
    const dataEngSkillBars = document.querySelectorAll("#dataEngSkillBars .progress");

    const animateBars = (bars) => {
      bars.forEach((progressBar) => {
        const percentage = progressBar.getAttribute("data-percentage");
        const skillPercElem = progressBar.querySelector(".skill-percentage");
        const finalValue = parseInt(percentage, 10);
        let current = 0;

        progressBar.style.transition = "width 3s ease";
        progressBar.style.width = percentage;

        const interval = setInterval(() => {
          current++;
          skillPercElem.textContent = current + "%";
          if (current >= finalValue) clearInterval(interval);
        }, 30);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionBars = entry.target.querySelectorAll(".progress");
          animateBars(sectionBars);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById("fullStackSkillBars"));
    observer.observe(document.getElementById("dataEngSkillBars"));
  }

  animateSkillBars();

});


















