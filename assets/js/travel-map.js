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
  imageryProvider: new Cesium.IonImageryProvider({ assetId: 2 }),
  terrainProvider: Cesium.createWorldTerrain()
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
  destination: Cesium.Cartesian3.fromDegrees(0, 20, 15000000)
});
let isUserInteracting = false;

// Stop rotation when user interacts
viewer.scene.screenSpaceCameraController.enableRotate = true;

// Add scroll-locking behavior
let isGlobeClicked = false;
const cesiumContainer = document.getElementById('cesiumContainer');

// Enable interaction only after the globe is clicked
cesiumContainer.addEventListener('mousedown', () => {
  isGlobeClicked = true;
  viewer.scene.screenSpaceCameraController.enableInputs = true;
});

// Disable interaction when clicking outside the globe
document.addEventListener('click', (event) => {
  if (!cesiumContainer.contains(event.target)) {
    isGlobeClicked = false;
    viewer.scene.screenSpaceCameraController.enableInputs = false;
  }
});

// Stop rotation on hover and resume when mouse leaves globe container
cesiumContainer.addEventListener('mouseenter', () => {
  isUserInteracting = true;
  clearTimeout(inactivityTimeout);
});

cesiumContainer.addEventListener('mouseleave', () => {
  isUserInteracting = false;
  resetInactivityTimeout();
});

let inactivityTimeout;
function resetInactivityTimeout() {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    if (!isUserInteracting) {
      viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(0, 20, 15000000),
        duration: 3
      });
    }
  }, 30000);
}

viewer.clock.onTick.addEventListener(() => {
  if (!isUserInteracting) {
    viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -0.001); // Slow rotation
  }
});













