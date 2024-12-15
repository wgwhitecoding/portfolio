document.addEventListener("DOMContentLoaded", () => {
    const text = `Meet Henry, the charismatic whale shark you’ll see in the video—he’s one of the many stars of my underwater adventures! With his gentle nature and endless curiosity, Henry inspires awe and reveals the wonders of the ocean’s depths. Scuba diving is a chance to explore, innovate, and learn in ways you’ve never imagined. Click below to start your interactive underwater adventure I made just for you!`;
  
    const typingContainer = document.getElementById("typing-container");
    let charIndex = 0;
  
    function typeWriter() {
      if (charIndex < text.length) {
        typingContainer.innerHTML = `${text.substring(0, charIndex + 1)}<span class="cursor">|</span>`;
        charIndex++;
        setTimeout(typeWriter, 50); // Adjust typing speed here
      } else {
        // Remove the blinking cursor once typing is complete
        typingContainer.innerHTML = text;
      }
    }
  
    typeWriter();
  });
  
  
  
  
  
  
  