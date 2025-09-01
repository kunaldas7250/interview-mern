import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // 👈 must import once
import { Icon } from "leaflet";
const GoogleMaps = () => {
  const center = [12.9116, 77.6389]; // ✅ Leaflet expects [lat, lng]
  const locations = [
    {
      name: "Bangalore Palace",
      geocode: [12.9987, 77.592],
      message: "🏰 Bangalore Palace - Historic palace built in 1878",
    },
    {
      name: "Lalbagh Botanical Garden",
      geocode: [12.9507, 77.5848],
      message: "🌿 Lalbagh Botanical Garden - Famous for glass house & flower shows",
    },
    {
      name: "ISKCON Temple Bangalore",
      geocode: [13.0097, 77.5511],
      message: "🙏 ISKCON Temple - Spiritual & cultural landmark",
    },
    {
      name: "Cubbon Park",
      geocode: [12.9763, 77.5929],
      message: "🌳 Cubbon Park - Green lung of Bangalore",
    },
    {
      name: "Vidhana Soudha",
      geocode: [12.9796, 77.5907],
      message: "🏛️ Vidhana Soudha - Iconic legislative building",
    },
  ];
const customIcon = new Icon({
  iconUrl: "https://images.unsplash.com/photo-1509223197845-458d87318791?w=50", 
  iconSize: [30,30], // adjust size to fit
  iconAnchor: [20, 40], // point of icon which will be at marker's location
   popupAnchor: [0, -40], // popup position relative to icon
});

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((item, index) => (
        <Marker key={index} position={item.geocode} icon={customIcon}>
          <Popup>
            <b>{item.name}</b>
            <br />
            {item.message}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GoogleMaps;
