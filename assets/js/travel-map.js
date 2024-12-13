// Initialize the map
const map = L.map('map', {
    center: [20, 0], // Center the map globally (latitude, longitude)
    zoom: 2, // Initial zoom level
    minZoom: 3, // Prevent zooming out too far
    maxBounds: [
      [-90, -180], // Southwest corner of the world
      [90, 180]    // Northeast corner of the world
    ],
    maxBoundsViscosity: 1.0 // Ensure the map sticks to the bounds
  });
  
  // Add CartoDB dark tile layer for a clean dark background
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);
  
  // GeoJSON data for all countries
  const countriesGeoJSON = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            // Replace with real coordinates for Laos
            [[101.0, 14.0], [104.0, 14.0], [104.0, 18.0], [101.0, 18.0], [101.0, 14.0]]
          ]
        },
        "properties": {
          "name": "Laos",
          "visited": true
        }
      },
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            // Replace with real coordinates for Belgium
            [[3.0, 49.5], [6.4, 49.5], [6.4, 51.5], [3.0, 51.5], [3.0, 49.5]]
          ]
        },
        "properties": {
          "name": "Belgium",
          "visited": true
        }
      },
      // Add all other countries with their coordinates and visited status here
    ]
  };
  
  // Add countries to the map with precise styling
  L.geoJSON(countriesGeoJSON, {
    style: function(feature) {
      return {
        color: feature.properties.visited ? "#D4AF37" : "#444444", // Metallic gold for visited, subtle gray for others
        weight: feature.properties.visited ? 3 : 1, // Thicker border for visited countries
        fillOpacity: 0, // No fill color, only the border
        dashArray: feature.properties.visited ? "0" : "2 4" // Solid for visited, dashed for others
      };
    },
    onEachFeature: function(feature, layer) {
      // Add a popup for each country
      layer.bindPopup(`<b>${feature.properties.name}</b><br>Visited: ${feature.properties.visited ? "Yes" : "No"}`);
    }
  }).addTo(map);
  

  
