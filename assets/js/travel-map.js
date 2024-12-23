// Set your Cesium and Mapbox tokens
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNGZmYmRmNi1jZWI1LTQyZWQtYjVjZS1mNmFkZTA1NzFkOWYiLCJpZCI6MjYyMjUxLCJpYXQiOjE3MzQwODUzNzd9.fOrKy0A-cTgabl4bjQfONQYp5F1kz1Vk67iCk6aW48A'; // Replace with your Cesium token
const mapboxToken = 'pk.eyJ1Ijoid2lsbDE5ODUiLCJhIjoiY200bW1iZHIzMDZiaTJqcjg3YXRxbWphNyJ9.NjWZMctAOTg8V9rgTKMsOw'; // Replace with your Mapbox token

// Initialize the Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
  animation: false,
  timeline: false,
  baseLayerPicker: false,
  geocoder: false,
  navigationHelpButton: false,
  sceneModePicker: false,
  fullscreenButton: false, // Added to remove the fullscreen icon
  imageryProvider: new Cesium.IonImageryProvider({ assetId: 2 }),
  terrainProvider: Cesium.createWorldTerrain(),
  creditContainer: document.createElement('div'),
});

// Path to the GeoJSON file
const geoJsonPath = 'assets/data/countries.geojson';

// List of visited countries
const visitedCountries = [
  "Belgium", "Laos", "France", "Spain", "Portugal", "Italy", "Germany",
  "Thailand", "Indonesia", "Morocco", "Australia", "USA", "Canada", "Brazil",
  "Japan", "South Africa", "India", "China", "Mexico", "Russia", "South Korea",
  "United Kingdom", "Argentina", "Chile", "Peru", "New Zealand", "Sweden",
  "Norway", "Finland", "Poland", "Turkey", "Greece", "Egypt", "Israel"
];

// Load GeoJSON and add it to the globe
fetch(geoJsonPath)
  .then((response) => response.json())
  .then((geoJsonData) => {
    console.log('GeoJSON Data Loaded:', geoJsonData);

    if (geoJsonData.type === 'FeatureCollection' && geoJsonData.features) {
      geoJsonData.features.forEach((feature) => {
        console.log('Processing feature:', feature.properties.ADMIN);
        processFeature(feature);
      });
    } else if (geoJsonData.type === 'GeometryCollection' && geoJsonData.geometries) {
      geoJsonData.geometries.forEach((geometry) => {
        console.log('Processing geometry:', geometry);
        if (geometry.type === 'MultiPolygon' || geometry.type === 'Polygon') {
          const countryName = geometry.properties ? geometry.properties.ADMIN : null;
          if (countryName && visitedCountries.includes(countryName)) {
            addPolygonToGlobe(geometry, countryName);
          }
        }
      });
    } else {
      console.error('Unexpected GeoJSON structure:', geoJsonData);
    }
  })
  .catch((error) => {
    console.error('Error loading GeoJSON:', error);
  });

function processFeature(feature) {
  const countryName = feature.properties ? feature.properties.ADMIN : null;

  if (countryName && visitedCountries.includes(countryName)) {
    console.log(`Highlighting country: ${countryName}`);
    const polygons = [];

    // Handle MultiPolygon or Polygon geometries
    if (feature.geometry.type === 'Polygon') {
      polygons.push(feature.geometry.coordinates);
    } else if (feature.geometry.type === 'MultiPolygon') {
      polygons.push(...feature.geometry.coordinates);
    }

    // Add each polygon to the globe
    polygons.forEach((polygon) => {
      addPolygonToGlobe({ coordinates: polygon, type: 'Polygon' }, countryName);
    });
  }
}

function addPolygonToGlobe(geometry, name) {
  const coordinates = geometry.coordinates;
  const hierarchy = coordinates[0].map(coord => Cesium.Cartesian3.fromDegrees(coord[0], coord[1], 0));
  viewer.entities.add({
    name,
    polygon: {
      hierarchy: new Cesium.PolygonHierarchy(hierarchy),
      material: Cesium.Color.RED.withAlpha(0.7),
      outline: true,
      outlineColor: Cesium.Color.BLACK,
      height: 0
    },
  });
}

// Set the globe to rotate initially
viewer.scene.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(0, 20, 25000000)
});
let isUserInteracting = false;

// Stop rotation when user interacts
viewer.scene.screenSpaceCameraController.enableRotate = true;

const cesiumContainer = document.getElementById('cesiumContainer');

// Enable interaction only after the globe is clicked
cesiumContainer.addEventListener('mousedown', () => {
  isUserInteracting = true;
  viewer.scene.screenSpaceCameraController.enableInputs = true;
});

// Disable interaction when clicking outside the globe
document.addEventListener('click', (event) => {
  if (!cesiumContainer.contains(event.target)) {
    isUserInteracting = false;
    viewer.scene.screenSpaceCameraController.enableInputs = false;
  }
});

// Stop rotation on hover and reset instantly when leaving
cesiumContainer.addEventListener('mouseenter', () => {
  isUserInteracting = true;
  viewer.clock.onTick.removeEventListener(rotateGlobe);
});

cesiumContainer.addEventListener('mouseleave', () => {
  isUserInteracting = false;

  // Reset the globe instantly when leaving the container
  viewer.scene.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(0, 20, 25000000),
    duration: 2,
    complete: () => {
      viewer.clock.onTick.addEventListener(rotateGlobe); // Resume rotation after reset
    }
  });
});

// Rotate the globe slowly when not interacting
function rotateGlobe() {
  if (!isUserInteracting) {
    viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -0.001); // Slow rotation
  }
}

// Handle inactivity after 30 seconds
let inactivityTimeout;
function resetInactivityTimeout() {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    if (!isUserInteracting) {
      viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(0, 20, 25000000),
        duration: 3
      });
    }
  }, 30000); // 30 seconds
}

// Initialize rotation and inactivity timeout
viewer.clock.onTick.addEventListener(rotateGlobe);
resetInactivityTimeout();





const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to match section
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas(); // Initial sizing
window.addEventListener("resize", resizeCanvas); // Resize on window change

// Bubble Class
class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width; // Random horizontal position
    this.y = canvas.height + Math.random() * 200; // Start below the canvas
    this.size = Math.random() * 20 + 10; // Random size (10 to 30px)
    this.speed = Math.random() * 1 + 0.5; // Random upward speed
  }

  move() {
    this.y -= this.speed; // Move the bubble upward
    if (this.y < -this.size) {
      // Reset bubble to the bottom when it goes off-screen
      this.y = canvas.height + this.size;
      this.x = Math.random() * canvas.width;
    }
  }

  display() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)"; // Semi-transparent white
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2); // Draw circle
    ctx.fill();
  }
}

// Initialize bubbles
const bubbles = [];
for (let i = 0; i < 50; i++) {
  bubbles.push(new Bubble());
}

// Animate the bubbles
function animateBubbles() {
  // Check canvas size
  if (canvas.width === 0 || canvas.height === 0) {
    console.error("Canvas size is zero. Check layout or CSS.");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Update and draw each bubble
  bubbles.forEach((bubble) => {
    bubble.move();
    bubble.display();
  });

  requestAnimationFrame(animateBubbles); // Continue the animation
}

// Start animation
animateBubbles();


// Scroll Trigger for Typing Animation
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#scuba-diving");
  const typingText = document.querySelector(".typing-animation .typing-text");

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }

  window.addEventListener("scroll", () => {
    if (isInViewport(section)) {
      typingText.style.animation = "typing 4s steps(60, end), blink 0.5s step-end infinite alternate";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const techImages = document.querySelectorAll(".tech-custom-image"); // Tech images
  const miniGameImages = document.querySelectorAll(".mini-game-image"); // Mini Games images
  const techPointer = document.getElementById("pointer"); // Tech pointer
  const miniGamesPointer = document.getElementById("mini-games-pointer"); // Mini Games pointer

  let techCurrentIndex = 0; // Track Tech pointer index
  let miniGameCurrentIndex = 0; // Track Mini Games pointer index

  const movePointer = (images, pointer, currentIndex) => {
    if (images.length === 0) return currentIndex; // Exit if no images

    const image = images[currentIndex];
    const rect = image.getBoundingClientRect();
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    pointer.style.top = `${rect.top + scrollY + rect.height / 2}px`;
    pointer.style.left = `${rect.left + scrollX + rect.width / 2}px`;
    pointer.style.display = "block"; // Show the pointer

    return (currentIndex + 1) % images.length; // Move to the next image
  };

  // Move Tech Pointer
  const moveTechPointer = () => {
    techCurrentIndex = movePointer(techImages, techPointer, techCurrentIndex);
  };

  // Move Mini Games Pointer
  const moveMiniGamesPointer = () => {
    miniGameCurrentIndex = movePointer(miniGameImages, miniGamesPointer, miniGameCurrentIndex);
  };

  // Initialize pointers
  moveTechPointer();
  moveMiniGamesPointer();

  // Schedule pointer movements
  setInterval(moveTechPointer, 3000); // Every 3 seconds
  setInterval(moveMiniGamesPointer, 3000); // Every 3 seconds
});






// Smooth scrolling function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // Get the target section's ID from the href
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Smoothly scroll to the target section
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Align the target section to the top of the viewport
        inline: 'nearest'
      });
    }
  });
});

// Highlight active link based on scroll position
const sections = document.querySelectorAll('section');
const navbarLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let currentSection = '';

  // Check which section is in the viewport
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute('id');
    }
  });

  // Highlight the corresponding navbar link
  navbarLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});




