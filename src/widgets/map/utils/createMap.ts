const styles = require('../json/GoogleMapStyles.json');

export const createMap = (lat: number, lng: number) => {
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement,
    {center: {lat, lng}, zoom: 4, styles});
  new google.maps.Marker({position: {lat, lng}, map: map});
};
