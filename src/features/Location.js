import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "../images/marker.png";
import {Icon} from 'leaflet';

function LocationMarker({ positions, setPositions }) {
  const map = useMapEvents({
    locationfound(e) {
      const newPosition = e.latlng;
      setPositions(prevPositions => [...prevPositions, newPosition]);
      if (map) map.flyTo(newPosition, map.getZoom());
      console.log('Location found:', e.latlng);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (map) map.locate();
    }, 5000); // MAJ location toutes les 5 secondes

    return () => clearInterval(interval); 
  }, [map]);

  return null;
}

function MapComponent() {
  const [positions, setPositions] = useState([
    [51.505, -0.09],  // London
    [48.8566, 2.3522] // Paris
  ]);
  const [map, setMap] = useState(null);

  // useEffect(() => {
  // }, [map, positions]);

  return (
    <>
    <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height: '50vh', marginTop: "20px" }}>
      <MapContainer
        center={{ lat: 50.1109, lng: 0.1313 }} // Roughly centered between London and Paris
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: '50vh', width: '70vh' }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker positions={positions} setPositions={setPositions} />
        {positions.map((position, idx) => (
          <Marker key={idx} position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [40, 40], iconAnchor: [19, 35]})}/>
        ))}
        <Polyline positions={positions} color="blue" />
      </MapContainer>
    </div>
    </>
  );
}

export default MapComponent;



// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents, Polyline } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine';

// function LocationMarker({ positions, setPositions }) {
//   const map = useMapEvents({
//     locationfound(e) {
//       const newPosition = e.latlng;
//       setPositions(prevPositions => [...prevPositions, newPosition]);
//       if (map) map.flyTo(newPosition, map.getZoom());
//       console.log('Location found:', e.latlng);
//     }
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (map) map.locate();
//     }, 10000); // Update location every 10 seconds

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [map]);

//   return null; // Since the markers will be rendered by MapComponent, we don't need to return anything here.
// }

// function MapComponent() {
//   const [positions, setPositions] = useState([
//     [51.505, -0.09],  // London
//     [48.8566, 2.3522] // Paris
//   ]);
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     if (map && positions.length > 1) {
//       const routingControl = L.Routing.control({
//         waypoints: positions.map(pos => L.latLng(pos)),
//         routeWhileDragging: true,
//         addWaypoints: false,
//         draggableWaypoints: false,
//         fitSelectedRoutes: true,
//         showAlternatives: false
//       }).addTo(map);

//       return () => {
//         if (map) map.removeControl(routingControl);
//       };
//     }
//   }, [map, positions]);

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', marginTop: "20px" }}>
//       <MapContainer
//         center={{ lat: 50.1109, lng: 0.1313 }} // Roughly centered between London and Paris
//         zoom={6}
//         scrollWheelZoom={false}
//         style={{ height: '50vh', width: '50vh' }}
//         whenCreated={setMap}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <LocationMarker positions={positions} setPositions={setPositions} />
//         {positions.map((position, idx) => (
//           <Marker key={idx} position={position}>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }

// export default MapComponent;
