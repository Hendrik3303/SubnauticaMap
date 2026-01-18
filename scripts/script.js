const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2
});

const lifepodIcon = L.icon({
    iconUrl: 'images/icons/lifepod.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    tooltipAnchor: [16, 0]
});


const imgUrl = 'SubnauticaMap.png';
const imgBounds = [[-1024, -1024], [1024, 1024]];

L.imageOverlay(imgUrl, imgBounds).addTo(map);
map.fitBounds(imgBounds);

// Function to load the markers from the data.js
function loadMarkers() {
    mapData.wracks.forEach(wrack => {
        L.marker(wrack.coords)
            .addTo(map)
            .bindPopup(`<b>${wrack.name}</b><br>${wrack.info}`);
    });
    mapData.lifepods.forEach(lifepod => {
        let popupContent = "";

        if (lifepod.image) {
            popupContent += `<img src="${lifepod.image}" class="popup-img">`;
        }

        popupContent += `<b>${lifepod.name}</b>
                        <hr style="border: 0.5px solid #233554; margin: 5px 0;">
                        <small>${lifepod.coordsinfo}</small><br>
                        <p>${lifepod.info}</p>`;

        L.marker(lifepod.coords, { icon: lifepodIcon })
            .addTo(map)
            .bindPopup(popupContent, {
            maxWidth: 300,
            minWidth: 200
            })
            .bindTooltip(lifepod.name, {
            direction: 'right',
            opacity: 0.9 
            });
    });
}

function getCoordinates() {
    // Reference to HTML
    const coordsDisplay = document.getElementById('coords-display');

    // Event
    map.on('mousemove', function(e) {
        // Get Leaflet-cordinates
        const { lat, lng } = e.latlng;

        const gameX = Math.round(lng);
        const gameZ = Math.round(lat);

        // Refresh 
        coordsDisplay.innerHTML = `X: ${gameX} | Z: ${gameZ}`;
    });
}

function loadCustomleafletControll() {
    map.whenReady(() => {
    const zoomContainer = document.querySelector('.leaflet-control-zoom');

    const centerBtn = L.DomUtil.create('a', 'leaflet-control-center', zoomContainer);
    centerBtn.innerHTML = '⊙';
    centerBtn.href = '#';
    centerBtn.title = 'Center map';
    centerBtn.role = 'button';

    L.DomEvent.on(centerBtn, 'click', (e) => {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        map.fitBounds(imgBounds);
    });
});
}


loadMarkers();
getCoordinates();
loadCustomleafletControll();

