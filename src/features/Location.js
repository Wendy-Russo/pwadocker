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
    <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'center'}}>
      <MapContainer
        center={{ lat: 50.1109, lng: 0.1313 }}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: '50vh', width: '100vh' }}
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