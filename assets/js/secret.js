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

          observer.unobserve(aboutSection); // Stop observing after the animation is triggered
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of the section is visible
    }
  );

  observer.observe(aboutSection); // Start observing the About Me section
});










document.addEventListener("DOMContentLoaded", function () {
    const gallerySwiper = new Swiper(".gallery-swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 3, /* Fixed number for consistent looping */
      loop: true, /* Enable infinite looping */
      coverflowEffect: {
        rotate: 50,      /* Adjusted rotation for smoother effect */
        stretch: 0,      /* No stretching */
        depth: 200,      /* Adjusted depth for better visibility */
        modifier: 1,     /* Balanced modifier */
        slideShadows: false, /* Disable slide shadows for clarity */
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
        delay: 7000, /* Delay between transitions (7 seconds) */
        disableOnInteraction: false, /* Continue autoplay after interactions */
        pauseOnMouseEnter: true, /* Pause autoplay on hover */
      },
      breakpoints: {
        1400: {
          slidesPerView: 3, /* Maintain 3 slides per view for large screens */
          spaceBetween: 40,
        },
        1200: {
          slidesPerView: 3, /* Maintain 3 slides per view for medium screens */
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 2, /* Reduce to 2 slides per view for tablets */
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 1, /* Single slide per view for mobile devices */
          spaceBetween: 20,
        },
      },
    });
  });