document.addEventListener("DOMContentLoaded", () => {
    const sections = [
      {
        text: `Meet Henry, the charismatic whale shark you’ll see in the video—he’s one of the many stars of my underwater adventures! With his gentle nature and endless curiosity, Henry inspires awe and reveals the wonders of the ocean’s depths. Scuba diving is a chance to explore, innovate, and learn in ways you’ve never imagined. Click below to join Scubi Steve in a underwater adventure I made just for you!`,
        containerId: "typing-container",
      },
      {
        text: `From creating innovative tools to leveraging cutting-edge technologies, my tech journey is an exciting fusion of creativity and problem-solving. Each line of code tells a story, and every project pushes boundaries to deliver impactful solutions. Scroll below to explore a world where innovation meets passion!`,
        containerId: "tech-typing-container",
      },
    ];
  
    sections.forEach(({ text, containerId }) => {
      const typingContainer = document.getElementById(containerId);
      let charIndex = 0;
      let isTyping = false; // Ensure typing starts only once
  
      function typeWriter() {
        if (charIndex < text.length) {
          typingContainer.innerHTML = `${text.substring(0, charIndex + 1)}<span class="cursor">|</span>`;
          charIndex++;
          setTimeout(typeWriter, 50); // Adjust typing speed here
        } else {
          typingContainer.innerHTML = text; // Remove the blinking cursor after completion
        }
      }
  
      // Use Intersection Observer to start typing when the element is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isTyping) {
              isTyping = true; // Ensure typing starts only once
              typeWriter();
              observer.unobserve(typingContainer); // Stop observing once typing starts
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of the element is visible
        }
      );
  
      observer.observe(typingContainer);
    });
  });
  
  
  
  
  
  
  
  
  