document.addEventListener("DOMContentLoaded", () => {
  const curtainContainer = document.querySelector(".curtain-container");
  const heroText = document.querySelector(".hero-text");
  const heroImage = document.querySelector(".hero-image");
  const elements = document.querySelectorAll(
    ".hero-text h1, .hero-text p, .cta-buttons .btn, .hero-image img"
  );

  // Initially hide all elements
  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
  });

  // Wait for the curtain animation to complete fully
  setTimeout(() => {
    curtainContainer.style.display = "none"; // Remove the curtains

    // Start hero section animations
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transition = "opacity 1.5s ease, transform 1.5s ease"; // Smooth transition
        el.style.opacity = "1"; // Fade in
        el.style.transform = "translateY(0)"; // Slide up into place
      }, index * 800); // Staggered delay of 800ms between each element
    });

    // Ensure hero section container is visible (optional safeguard)
    heroText.style.opacity = "1";
    heroImage.style.opacity = "1";
  }, 4000); // Hero animation starts after the curtains are fully removed (4 seconds)
});




document.addEventListener("DOMContentLoaded", () => {
  function animateSection(sectionId) {
    const section = document.querySelector(sectionId);
    const header = section.querySelector("h2");
    const textElements = section.querySelectorAll(
      ".about-text p, .scuba-fun-text p, .tech-journey-text p, .travel-chronicles-text p"
    );
    const image = section.querySelector(
      ".about-image img, .scuba-fun-image img, .tech-journey-image img, .travel-chronicles-image img"
    );

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (header) {
              header.style.opacity = "1";
              header.style.transform = "translateY(0)";
            }

            textElements.forEach((element, index) => {
              setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
              }, index * 300);
            });

            if (image) {
              setTimeout(() => {
                image.style.opacity = "1";
                image.style.transform = "translateY(0)";
              }, 600);
            }

            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
  }

  animateSection("#about");
  animateSection("#scuba-fun");
  animateSection("#tech-journey");
  animateSection("#travel-chronicles");
});










document.addEventListener("DOMContentLoaded", function () {
  const gallerySwiper = new Swiper(".gallery-swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    loop: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: {
      enabled: true,
    },
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      1400: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  });
});



const scrollableElement = document.querySelector('.scroll-content');

scrollableElement.addEventListener('scroll', () => {
  const contentHeight = scrollableElement.scrollHeight;
  const containerHeight = scrollableElement.clientHeight;

  // Calculate the thumb height based on the scroll ratio
  const thumbHeight = Math.max(containerHeight / contentHeight * containerHeight, 50);
  document.documentElement.style.setProperty('--thumb-height', `${thumbHeight}px`);
});








