// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [-74.5, 40],
//     zoom: 8
// });

// const marker1 = new mapboxgl.Marker()
//     .setLngLat([-74.5, 40])
//     .addTo(map);


mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: coordinates,
    zoom: 9,
});

map.addControl(new mapboxgl.NavigationControl());


const marker1 = new mapboxgl.Marker({ color: 'orange' })
    .setLngLat(coordinates)
    .addTo(map);