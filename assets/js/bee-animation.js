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
  const closeModalButton = document.querySelector(".close"); // Modal close button
  const clonedBeeContainer = document.getElementById("clonedBee");

  // Full-screen overlay for fade-to-black effect
  const fadeOverlay = document.createElement("div");
  fadeOverlay.className = "fade-overlay";
  document.body.appendChild(fadeOverlay);

  // Bee Toggle elements
  const beeToggle = document.getElementById("beeToggle");
  const toggleText = document.getElementById("toggle-text");

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
  let isBeeActive = true; // Track if the bee is toggled on

  // Set the toggle to start as "on"
  beeToggle.checked = true;

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
    if (isPaused || isCaught || !isBeeActive) return;
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
    if (isCaught || !isBeeActive) return; // Stop flying if the bee is caught or toggled off
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
    if (!isBeeActive || beeContainer.contains(e.target)) return; // Stop if the bee is toggled off or clicked
    const randomMissedPhrase = missedPhrases[Math.floor(Math.random() * missedPhrases.length)];
    message.textContent = randomMissedPhrase;

    // Position the message near the click
    message.style.left = `${e.clientX}px`;
    message.style.top = `${e.clientY}px`;
    message.style.display = "block";

    // Hide the message after 1 second
    setTimeout(() => {
      message.style.display = "none";
    }, 1000);
  });

  // Handle "catching" the bee
  beeContainer.addEventListener("click", () => {
    if (!isBeeActive) return; // Stop if the bee is toggled off
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

        // Trigger fade-to-black effect
        fadeOverlay.style.display = "block";
        fadeOverlay.style.opacity = 1;

        // Redirect after the fade completes
        setTimeout(() => {
          window.location.href = "secret-page.html"; // Redirect to the secret page
        }, 2000); // Matches the fade duration
      },
    });
  });

  // Close modal on "x" or outside click
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    beeContainer.style.display = "block"; // Restore bee visibility
    isCaught = false; // Reset caught state
    flyBee(); // Restart flying
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      beeContainer.style.display = "block"; // Restore bee visibility
      isCaught = false; // Reset caught state
      flyBee(); // Restart flying
    }
  });

  // Handle bee toggle functionality
  beeToggle.addEventListener("change", () => {
    isBeeActive = beeToggle.checked; // Update the bee activity state

    if (isBeeActive) {
      console.log("Bee turned on");
      beeContainer.style.display = "block"; // Show the bee
      toggleText.textContent = "Bee is On";
      flyBee(); // Restart the flying animation
    } else {
      console.log("Bee turned off");
      beeContainer.style.display = "none"; // Hide the bee
      gsap.killTweensOf(beeContainer); // Stop the flying animation
      message.style.display = "none"; // Hide any active messages
      toggleText.textContent = "Bee is Off";
    }
  });
});














  
  
  
  
  
