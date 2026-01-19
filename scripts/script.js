const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2
});

const allMarkers = {};

const imgUrl = 'SubnauticaMap.png';
const imgBounds = [[-2048, -2048], [2048, 2048]];
L.imageOverlay(imgUrl, imgBounds).addTo(map);
map.fitBounds(imgBounds);

const lifepodIcon = L.icon({
    iconUrl: 'images/icons/lifepod.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [-0.5, -16],
    tooltipAnchor: [16, 0]
});



function toggleTrack(id, isChecked) {
    localStorage.setItem('track-' + id, isChecked);
    
    if (allMarkers[id]) {
        allMarkers[id].setOpacity(isChecked ? 0.4 : 1.0);
    }

    setTimeout(() => {map.closePopup();}, 200);
}

function getCoordinates() {
    const coordsDisplay = document.getElementById('coords-display');
    map.on('mousemove', function(e) {
        const { lat, lng } = e.latlng;
        coordsDisplay.innerHTML = `X: ${Math.round(lng)} | Z: ${Math.round(lat)}`;
    });
}

function createPopupContent(item, type) {
    const isTracked = localStorage.getItem('track-' + item.id) === 'true';
    
    let content = "";
    if (item.image) {
        content += `<img src="${item.image}" class="popup-img">`;
    }

    content += `<b>${item.name}</b>
                <hr style="border: 0.5px solid #233554; margin: 5px 0;">
                ${item.coordsinfo ? `<small>${item.coordsinfo}</small><br>` : ''}
                <p>${item.info}</p>
                <div class="popup-footer">
                    <label class="track-container">
                        <input type="checkbox" ${isTracked ? 'checked' : ''} 
                               onchange="toggleTrack('${item.id}', this.checked, '${type}')">
                        <span class="track-text">Track</span>
                    </label>
                </div>`;
    return content;
}

// Function to load the markers from the data.js
function loadMarkers() {
    mapData.lifepods.forEach(lifepod => {
        const isTracked = localStorage.getItem('track-' + lifepod.id) === 'true';

        const marker = L.marker(lifepod.coords, { 
            icon: lifepodIcon,
            opacity: isTracked ? 0.4 : 1.0
        }).addTo(map);

        allMarkers[lifepod.id] = marker;

        marker.bindPopup(() => createPopupContent(lifepod, 'lifepod'), {
            maxWidth: 300,
            minWidth: 200
        });

        marker.bindTooltip(lifepod.name, { direction: 'right', opacity: 0.9 });
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

