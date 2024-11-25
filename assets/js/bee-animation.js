document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  const beeContainer = document.querySelector(".bee-container");
  const beeAnimation = document.getElementById("bee-animation");
  const message = document.createElement("div");
  message.className = "message";
  document.body.appendChild(message);

  // Modal elements
  const modal = document.getElementById("beeModal");
  const followButton = document.getElementById("followButton");
  const clonedBeeContainer = document.getElementById("clonedBee");

  if (beeAnimation) {
    console.log("Bee animation element found");
    beeAnimation.load("assets/animation/just-a-bee.json");
    console.log("Lottie animation loaded successfully!");
  } else {
    console.error("Bee animation element NOT found");
    return;
  }

  // Phrases for flying encouragement
  const flyingPhrases = ["Catch me if you can!", "Try to catch me!", "You can't get me!", "Come on, try harder!"];
  const missedPhrases = ["Hehe, missed me!", "Too slow!", "Try again!"];

  let isPaused = false;
  let isCaught = false; // Track if the bee is caught

  // Random positions for flying
  function getRandomPosition() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const x = Math.random() * (viewportWidth - 100); // Stay within horizontal bounds
    const y = window.scrollY + Math.random() * (viewportHeight - 100); // Allow movement down the page

    console.log(`New position: x=${x}, y=${y}`); // Debugging
    return { x, y };
  }

  // Make the bee pause, speak, and then fly away
  function speakAndFly() {
    if (isPaused || isCaught) return;
    isPaused = true;

    // Randomly pick a phrase
    const randomPhrase = flyingPhrases[Math.floor(Math.random() * flyingPhrases.length)];
    message.textContent = randomPhrase;

    // Position the message near the bee
    const beeRect = beeContainer.getBoundingClientRect();
    message.style.left = `${beeRect.left + window.scrollX + 50}px`; // Adjust as needed
    message.style.top = `${beeRect.top + window.scrollY - 20}px`; // Adjust for scrolling
    message.style.display = "block";

    // Pause for 2 seconds, then fly away
    setTimeout(() => {
      message.style.display = "none";
      flyBee(); // Resume flying
      isPaused = false;
    }, 2000);
  }

  // Flying animation
  function flyBee() {
    if (isCaught) return; // Stop flying if the bee is caught
    const { x, y } = getRandomPosition();
    gsap.to(beeContainer, {
      x: x,
      y: y,
      duration: 2 + Math.random() * 2, // Random duration between 2-4 seconds
      ease: "power1.inOut",
      onComplete: speakAndFly,
    });
  }
  flyBee();

  // Handle missed clicks
  document.body.addEventListener("click", (e) => {
    if (!beeContainer.contains(e.target)) {
      const randomMissedPhrase = missedPhrases[Math.floor(Math.random() * missedPhrases.length)];
      message.textContent = randomMissedPhrase;

      // Position the message near the click
      message.style.left = `${e.clientX}px`;
      message.style.top = `${e.clientY}px`;
      message.style.display = "block";

      // Hide the message after a short delay
      setTimeout(() => {
        message.style.display = "none";
      }, 1000);
    }
  });

  // Handle "catching" the bee
  beeContainer.addEventListener("click", () => {
    console.log("Bee clicked!");
    isCaught = true; // Mark the bee as caught

    // Stop the flying animation
    gsap.killTweensOf(beeContainer);
    beeContainer.style.display = "none"; // Hide the bee temporarily

    // Show the modal
    modal.style.display = "flex";

    // Display the cloned bee in the modal
    clonedBeeContainer.innerHTML = `
      <lottie-player
        src="assets/animation/just-a-bee.json"
        background="transparent"
        speed="1"
        loop
        autoplay
        style="width: 100px; height: 100px;"
      ></lottie-player>
      <div class="message">You got me... follow me!</div>
    `;
  });

  // Handle "Follow" button in the modal
  followButton.addEventListener("click", () => {
    console.log("Follow button clicked");
    modal.style.display = "none"; // Close the modal

    // Remove the cloned bee
    clonedBeeContainer.innerHTML = "";

    // Restore the original bee and make it fly into the vortex
    beeContainer.style.display = "block";

    // Create the vortex if it doesn't exist
    let vortex = document.querySelector(".vortex");
    if (!vortex) {
      vortex = document.createElement("div");
      vortex.className = "vortex";
      document.body.appendChild(vortex);

      // Add particle layer
      const particles = document.createElement("div");
      particles.className = "particles";
      vortex.appendChild(particles);

      // Position the vortex in the top-left corner of the current viewport
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      vortex.style.left = `${scrollX + 20}px`; // 20px from the left edge
      vortex.style.top = `${scrollY + 20}px`; // 20px from the top edge
    }

    // Animate the bee into the vortex
    const vortexRect = vortex.getBoundingClientRect();
    const beeRect = beeContainer.getBoundingClientRect();
    gsap.to(beeContainer, {
      x: vortexRect.left + window.scrollX + vortexRect.width / 2 - beeRect.width / 2 - beeRect.left,
      y: vortexRect.top + window.scrollY + vortexRect.height / 2 - beeRect.height / 2 - beeRect.top,
      scale: 0.2, // Shrink the bee as it enters the vortex
      duration: 1.5,
      ease: "power1.inOut",
      onComplete: () => {
        console.log("Redirecting to the secret page...");
        window.location.href = "secret-page.html"; // Redirect to the secret page
      },
    });
  });
});











  
  
  
  
  
