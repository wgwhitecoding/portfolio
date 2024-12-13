// Initialize the map
const map = L.map('map', {
  center: [20, 0], // Center the map globally (latitude, longitude)
  zoom: 2, // Initial zoom level
  minZoom: 2, // Minimum zoom level to prevent zooming out too far
  maxBounds: [
    [-90, -180], // Southwest corner of the world
    [90, 180]    // Northeast corner of the world
  ],
  maxBoundsViscosity: 1.0 // Ensure the map sticks to the bounds
});

// Add CartoDB dark tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// Add markers for cities
const cities = [
  { name: "Vientiane, Laos", lat: 17.9757, lng: 102.6331 },
  { name: "Brussels, Belgium", lat: 50.8503, lng: 4.3517 },
  { name: "Bangkok, Thailand", lat: 13.7563, lng: 100.5018 },
  { name: "Jakarta, Indonesia", lat: -6.2088, lng: 106.8456 },
  { name: "Phnom Penh, Cambodia", lat: 11.5564, lng: 104.9282 },
  { name: "Hanoi, Vietnam", lat: 21.0285, lng: 105.8542 },
  { name: "Rabat, Morocco", lat: 34.0209, lng: -6.8416 },
  { name: "Panama City, Panama", lat: 8.9824, lng: -79.5199 },
  { name: "San José, Costa Rica", lat: 9.9281, lng: -84.0907 },
  { name: "Mexico City, Mexico", lat: 19.4326, lng: -99.1332 },
  { name: "Bern, Switzerland", lat: 46.9481, lng: 7.4474 },
  { name: "Paris, France", lat: 48.8566, lng: 2.3522 },
  { name: "Madrid, Spain", lat: 40.4168, lng: -3.7038 },
  { name: "Kuala Lumpur, Malaysia", lat: 3.1390, lng: 101.6869 },
  { name: "Tunis, Tunisia", lat: 36.8065, lng: 10.1815 },
  { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357 },
  { name: "Lisbon, Portugal", lat: 38.7223, lng: -9.1393 },
  { name: "Naypyidaw, Myanmar (Burma)", lat: 19.7633, lng: 96.0785 },
  { name: "Canberra, Australia", lat: -35.2809, lng: 149.1300 },
  { name: "Berlin, Germany", lat: 52.5200, lng: 13.4050 },
  { name: "Brasília, Brazil", lat: -15.8267, lng: -47.9218 },
  { name: "Nouakchott, Mauritania", lat: 18.0735, lng: -15.9582 },
  { name: "Prague, Czech Republic", lat: 50.0755, lng: 14.4378 },
  { name: "Ankara, Turkey", lat: 39.9334, lng: 32.8597 },
  { name: "Washington, D.C., USA", lat: 38.9072, lng: -77.0369 },
  { name: "Ottawa, Canada", lat: 45.4215, lng: -75.6972 },
  { name: "Bogotá, Colombia", lat: 4.7110, lng: -74.0721 },
  { name: "Lima, Peru", lat: -12.0464, lng: -77.0428 },
  { name: "Montevideo, Uruguay", lat: -34.9011, lng: -56.1645 },
  { name: "Sucre, Bolivia", lat: -19.0196, lng: -65.2619 },
  { name: "Managua, Nicaragua", lat: 12.1150, lng: -86.2362 },
  { name: "Santiago, Chile", lat: -33.4489, lng: -70.6693 },
  { name: "Buenos Aires, Argentina", lat: -34.6037, lng: -58.3816 },
  { name: "New Delhi, India", lat: 28.6139, lng: 77.2090 },
  { name: "Tokyo, Japan", lat: 35.6895, lng: 139.6917 },
  { name: "Pretoria, South Africa", lat: -25.7479, lng: 28.2293 }
];

// Add markers to the map for each city
cities.forEach(city => {
  L.marker([city.lat, city.lng])
    .addTo(map)
    .bindPopup(`<b>${city.name}</b>`);
});

  

  
