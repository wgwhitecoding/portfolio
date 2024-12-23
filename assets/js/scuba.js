document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded fired"); // Debug log

  const sections = [
    {
      text: `Meet Henry, the charismatic whale shark you’ll see in the video—he’s one of the many stars of my underwater adventures! With his gentle nature and endless curiosity, Henry inspires awe and reveals the wonders of the ocean’s depths. Scuba diving is a chance to explore, innovate, and learn in ways you’ve never imagined. Click below to join Scubi Steve in a underwater adventure I made just for you!`,
      containerId: "typing-container",
    },
    {
      text: `From creating innovative tools to leveraging cutting-edge technologies, my tech journey is an exciting fusion of creativity and problem-solving. Each line of code tells a story, and every project pushes boundaries to deliver impactful solutions. Scroll below to explore a world where innovation meets passion!`,
      containerId: "tech-typing-container",
    },
    {
      text: `Dive into my Mini Games section, where fun meets learning! Explore games that challenge your problem-solving skills, spark creativity, and showcase the exciting possibilities of technology. Click on a game below to begin your journey into interactive adventures!`,
      containerId: "mini-games-typing-container",
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





  
  
  
  
  
  
  
  
  