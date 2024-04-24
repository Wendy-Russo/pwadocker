import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "../images/marker.png";
import { Icon } from 'leaflet';

function LocationMarker({ positions, setPositions }) {
  const map = useMapEvents({
    locationfound(e) {
      const newPosition = e.latlng;
      console.log('Location found:', newPosition);

      setPositions(prevPositions => {
        const newPositions = [...prevPositions, newPosition];
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);  // Le cookie expire dans 7 jours
        document.cookie = `userPositions=${JSON.stringify(newPositions)}; expires=${expiryDate.toUTCString()}; path=/`;

        return newPositions;
      });

      if (map) map.flyTo(newPosition, map.getZoom());
    },
    locationerror(e) {
      console.error('Location error:', e.message);
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
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const cookieData = document.cookie.split('; ').find(row => row.startsWith('userPositions='));
    if (cookieData) {
      const decodedCookie = decodeURIComponent(cookieData.split('=')[1]);
      const savedPositions = JSON.parse(decodedCookie);
      setPositions(savedPositions);
    }
  }, []);

  return (
    <>
      <div style={{
        display: 'grid', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        width: '100%'
      }}>
        <MapContainer
          center={{ lat: 50.1109, lng: 0.1313 }}
          zoom={6}
          scrollWheelZoom={false}
          style={{ 
            height: '100%', 
            width: '100vh',
            filter: 'brightness(0.75) contrast(1.5)'
          }}
          
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
