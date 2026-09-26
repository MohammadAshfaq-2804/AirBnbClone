
mapboxgl.accessToken=maptoken
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

//create a popup
 const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h4>${listing.title}</h4><p>Exact loction will provided after Booking</p>`
    );

const marker = new mapboxgl.Marker({color: '#FF0000'})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(popup) // sets a popup on this marker
  .addTo(map);
