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
  const aboutSection = document.querySelector("#about");
  const aboutHeader = document.querySelector("#about h2");
  const aboutTextElements = document.querySelectorAll("#about .about-text p");
  const aboutImage = document.querySelector("#about .about-image img");

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate the header
          aboutHeader.style.opacity = "1";
          aboutHeader.style.transform = "translateY(0)";

          // Animate each paragraph with a delay
          aboutTextElements.forEach((element, index) => {
            setTimeout(() => {
              element.style.opacity = "1";
              element.style.transform = "translateY(0)";
            }, index * 300); // Staggered delay for each paragraph
          });

          // Animate the image
          setTimeout(() => {
            aboutImage.style.opacity = "1";
            aboutImage.style.transform = "translateY(0)";
          }, 600);

          observer.unobserve(aboutSection); 
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  observer.observe(aboutSection);
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






