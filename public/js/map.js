const map = L.map("map").setView([53.5, -7.5], 7);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

L.marker([52.0058, -9.50664]).addTo(map).bindPopup("Killarney National Park");
