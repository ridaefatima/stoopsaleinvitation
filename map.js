



var map = L.map('map').setView([40.679404, -73.997512], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var marker = L.marker([40.679404, -73.997512]).addTo(map);
marker.bindPopup("<b>Carroll Gardens</b><br>Location of Stoop Sale!").openPopup();



