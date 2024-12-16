document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  /* 
  ===========================================================================
  ====================   BEE ELEMENTS & BASIC SETUP   ========================
  ===========================================================================
  */
  const beeContainer = document.querySelector(".bee-container");
  const beeAnimation = document.getElementById("bee-animation");
  const message = document.createElement("div");
  message.className = "message";
  document.body.appendChild(message);

  const modal = document.getElementById("beeModal1");
  const followButton = document.getElementById("followButton1");
  const closeModalButton = document.querySelector(".close1");
  const clonedBeeContainer = document.getElementById("clonedBee1");

  const fadeOverlay = document.createElement("div");
  fadeOverlay.className = "fade-overlay";
  document.body.appendChild(fadeOverlay);

  const beeToggle = document.getElementById("beeToggle");
  const toggleText = document.getElementById("toggle-text");

  /* 
  ===========================================================================
  ======================   LOTTIE BEE ANIMATION SETUP   ======================
  ===========================================================================
  */
  if (beeAnimation) {
    console.log("Bee animation element found");
    beeAnimation.load("assets/animation/just-a-bee.json");
    console.log("Lottie animation loaded successfully!");
  } else {
    console.error("Bee animation element NOT found");
    return;
  }

  /* 
  ===========================================================================
  ========================   VARIABLES & STATES   ============================
  ===========================================================================
  */
  const flyingPhrases = ["Catch me if you can!", "Try to catch me!", "You can't get me!", "Come on, try harder!"];
  const missedPhrases = ["Hehe, missed me!", "Too slow!", "Try again!"];

  let isPaused = false;
  let isCaught = false;
  let isBeeActive = true;

  beeToggle.checked = true; // Bee starts on

  /* 
  ===========================================================================
  ========================   RANDOM POSITIONING   ============================
  ===========================================================================
  */
  function getRandomPosition() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const x = Math.random() * (viewportWidth - 100);
    const y = window.scrollY + Math.random() * (viewportHeight - 100);
    console.log(`New position: x=${x}, y=${y}`);
    return { x, y };
  }

  /* 
  ===========================================================================
  ====================   SPEAK & FLY (PAUSE, MESSAGE)   =====================
  ===========================================================================
  */
  function speakAndFly() {
    if (isPaused || isCaught || !isBeeActive) return;
    isPaused = true;
    const randomPhrase = flyingPhrases[Math.floor(Math.random() * flyingPhrases.length)];
    message.textContent = randomPhrase;

    const beeRect = beeContainer.getBoundingClientRect();
    let messageX = beeRect.left + window.scrollX + 50;
    let messageY = beeRect.top + window.scrollY - 20;

    const messageWidth = message.offsetWidth;
    if (messageX + messageWidth > window.innerWidth) messageX = window.innerWidth - messageWidth - 10;
    if (messageX < 0) messageX = 10;

    const messageHeight = message.offsetHeight;
    if (messageY + messageHeight > window.innerHeight + window.scrollY) messageY = window.innerHeight + window.scrollY - messageHeight - 10;
    if (messageY < window.scrollY) messageY = window.scrollY + 10;

    message.style.left = `${messageX}px`;
    message.style.top = `${messageY}px`;
    message.style.display = "block";

    setTimeout(() => {
      message.style.display = "none";
      flyBee();
      isPaused = false;
    }, 2000);
  }

  /* 
  ===========================================================================
  =======================   BEE FLYING ANIMATION   ===========================
  ===========================================================================
  */
  function flyBee() {
    if (isCaught || !isBeeActive) return;
    const { x, y } = getRandomPosition();
    gsap.to(beeContainer, {
      x: x,
      y: y,
      duration: 2 + Math.random() * 2,
      ease: "power1.inOut",
      onComplete: speakAndFly,
    });
  }
  flyBee();

  /* 
  ===========================================================================
  ====================   MISSED CLICK MESSAGES   =============================
  ===========================================================================
  */
  document.body.addEventListener("click", (e) => {
    if (!isBeeActive || beeContainer.contains(e.target)) return;
    const randomMissedPhrase = missedPhrases[Math.floor(Math.random() * missedPhrases.length)];
    message.textContent = randomMissedPhrase;

    let messageX = e.clientX + window.scrollX;
    let messageY = e.clientY + window.scrollY;

    const messageWidth = message.offsetWidth;
    if (messageX + messageWidth > window.innerWidth + window.scrollX) messageX = window.innerWidth + window.scrollX - messageWidth - 10;
    if (messageX < window.scrollX) messageX = window.scrollX + 10;

    const messageHeight = message.offsetHeight;
    if (messageY + messageHeight > window.innerHeight + window.scrollY) messageY = window.innerHeight + window.scrollY - messageHeight - 10;
    if (messageY < window.scrollY) messageY = window.scrollY + 10;

    message.style.left = `${messageX}px`;
    message.style.top = `${messageY}px`;
    message.style.display = "block";

    setTimeout(() => { message.style.display = "none"; }, 1000);
  });

  /* 
  ===========================================================================
  ========================   CATCHING THE BEE   ==============================
  ===========================================================================
  */
  beeContainer.addEventListener("click", () => {
    if (!isBeeActive) return;
    console.log("Bee clicked!");
    isCaught = true;
    gsap.killTweensOf(beeContainer);
    beeContainer.style.display = "none";
    modal.style.display = "flex";

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

  /* 
  ===========================================================================
  ======================   FOLLOW BUTTON IN MODAL   ==========================
  ===========================================================================
  */
  followButton.addEventListener("click", () => {
    console.log("Follow button clicked");
    modal.style.display = "none";
    clonedBeeContainer.innerHTML = "";
    beeContainer.style.display = "block";

    let vortex = document.querySelector(".vortex");
    if (!vortex) {
      vortex = document.createElement("div");
      vortex.className = "vortex";
      document.body.appendChild(vortex);

      const particles = document.createElement("div");
      particles.className = "particles";
      vortex.appendChild(particles);

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      vortex.style.left = `${scrollX + 20}px`;
      vortex.style.top = `${scrollY + 20}px`;
    }

    const vortexRect = vortex.getBoundingClientRect();
    const beeRect = beeContainer.getBoundingClientRect();
    gsap.to(beeContainer, {
      x: vortexRect.left + window.scrollX + vortexRect.width / 2 - beeRect.width / 2 - beeRect.left,
      y: vortexRect.top + window.scrollY + vortexRect.height / 2 - beeRect.height / 2 - beeRect.top,
      scale: 0.2,
      duration: 1.5,
      ease: "power1.inOut",
      onComplete: () => {
        console.log("Redirecting to the secret page...");
        fadeOverlay.style.display = "block";
        fadeOverlay.style.opacity = 1;
        setTimeout(() => {
          window.location.href = "secret-page.html";
        }, 2000);
      },
    });
  });

  /* 
  ===========================================================================
  ======================   CLOSE MODAL FUNCTIONALITY   =======================
  ===========================================================================
  */
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    beeContainer.style.display = "block";
    isCaught = false;
    flyBee();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      beeContainer.style.display = "block";
      isCaught = false;
      flyBee();
    }
  });

  /* 
  ===========================================================================
  =======================   BEE TOGGLE FUNCTIONALITY   =======================
  ===========================================================================
  */
  beeToggle.addEventListener("change", () => {
    isBeeActive = beeToggle.checked;
    if (isBeeActive) {
      console.log("Bee turned on");
      beeContainer.style.display = "block";
      toggleText.textContent = "Bee is On";
      flyBee();
    } else {
      console.log("Bee turned off");
      beeContainer.style.display = "none";
      gsap.killTweensOf(beeContainer);
      message.style.display = "none";
      toggleText.textContent = "Bee is Off";
    }
  });
});

















  
  
  
  
  
