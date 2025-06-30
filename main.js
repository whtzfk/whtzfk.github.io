const map = L.map('map').setView([55.7558, 37.6176], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}
fetch('./points.json')
  .then(res => res.json())
  .then(points => {
    points.forEach(point => {
      const circle = L.circleMarker([point.lat, point.lng], {
        radius: 6,
        fillColor: '#2c7bb6',
        color: '#2c7bb6',
        weight: 2,
        opacity: 1,
        fillOpacity: 1.8
      }).addTo(map);

      const popupContent = `
        <b>${escapeHTML(point.title)}</b><br>
        ${escapeHTML(point.description)}<br>
        <a href="${point.diskLink}" target="_blank" rel="noopener noreferrer">Открыть фотоальбом на Яндекс.Диске</a>
      `;

      circle.bindPopup(popupContent);
    });
  })
  .catch(err => {
    console.error('Ошибка загрузки точек:', err);
  });
