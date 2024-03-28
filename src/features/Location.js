import React, { useState } from "react";

function Location() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState(""); // Ajout d'un état pour gérer les erreurs

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Full position object: ", position);
          setLocation(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
        },
        (err) => {
          console.error("Error getting location: ", err);
          setError("Failed to get location. " + err.message); // Gestion des erreurs
        }
      );
    } else {
      setError("Geolocation is not supported by this browser."); // Mise à jour de l'erreur si la géolocalisation n'est pas prise en charge
    }
  };
  
  return (
    <div>
      <h2>
        <button onClick={getLocation}>Get Location</button>
      </h2>
      {location && <p>{location}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Affichage conditionnel de l'erreur */}
    </div>
  );
}

export default Location;
