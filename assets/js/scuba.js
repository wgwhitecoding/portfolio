document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded fired"); // Debug log

  const sections = [
    {
      text: `Meet Henry, the charismatic whale shark you’ll see in the video—he’s one of the many stars of my underwater adventures! With his gentle nature and endless curiosity, Henry inspires awe and reveals the wonders of the ocean’s depths. Scuba diving is a chance to explore, innovate, and learn in ways you’ve never imagined. Click below to join Scubi Steve in a underwater adventure I made just for you!`,
      containerId: "typing-container",
    },
    {
      text: `From creating innovative tools to leveraging cutting-edge technologies, my tech journey blends creativity with problem-solving. These projects showcase a wide range of skills—from building full-stack applications with Python and Django to managing complex datasets with SQL and PostgreSQL. Whether developing task management systems, crafting interactive coding tools, or engineering data pipelines, I’m passionate about delivering practical, user-focused solutions.

Explore these creations to simplify everyday tasks—or scroll down to enjoy some fun mini-games at the bottom!!`,
      containerId: "tech-typing-container",
    },
    {
      text: `Powered by HTML, CSS, and JavaScript, these mini-games showcase the creativity and versatility of front-end web development. From dynamic animations to interactive challenges, they demonstrate how simple code transforms into engaging, playable experiences. 
      
      Dive in to explore how design and functionality come together to deliver fun, spark creativity, and bring ideas to life!`,
      containerId: "mini-games-typing-container",
    },
    {
      text: `"Discover the world through my eyes with this interactive 3D globe! Highlighting all the wonderful countries I’ve had the privilege to explore, it allows you to click on each destination to uncover stories, photos, videos, and moments that made each journey unforgettable. Each destination holds its own unique charm—interact with the globe to experience them for yourself and be inspired to embark on your own adventures."`,
      containerId: "travel-text-container",
    },
  ];

  sections.forEach(({ text, containerId }) => {
    const typingContainer = document.getElementById(containerId);
    if (!typingContainer) {
      console.error(`Element with ID '${containerId}' not found.`);
      return;
    }

    console.log(`Typing container found: ${containerId}`); // Debug log

    let charIndex = 0;
    let isTyping = false;

    function typeWriter() {
      console.log(`Typing character at index: ${charIndex}`); // Debug log
      if (charIndex < text.length) {
        typingContainer.innerHTML = `${text.substring(0, charIndex + 1)}<span class="cursor">|</span>`;
        charIndex++;
        setTimeout(typeWriter, 50); // Typing speed
      } else {
        typingContainer.innerHTML = text;
        console.log(`Typing complete for: ${containerId}`); // Debug log
      }
    }

    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log(`Observing '${containerId}' - isIntersecting:`, entry.isIntersecting);
            if (entry.isIntersecting && !isTyping) {
              console.log(`Typing started for: ${containerId}`); // Debug log
              isTyping = true;
              typeWriter();
              observer.unobserve(typingContainer);
            }
          });
        },
        { threshold: 0.3 }
      );

      console.log(`Initializing IntersectionObserver for ${containerId}`); // Debug log
      observer.observe(typingContainer);
    }, 100); // Delay observer initialization
  });
});






  
  
  
  
  
  
  
  
  