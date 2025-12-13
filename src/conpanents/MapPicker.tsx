import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Marker icon muammosini to'g'ri hal qilish
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface Position {
  lat: number;
  lng: number;
}

interface LocationMarkerProps {
  setPosition: (position: Position) => void;
}

function LocationMarker({ setPosition }: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

interface MapPickerProps {
  onSelect: (position: Position) => void;
}

export default function MapPicker({ onSelect }: MapPickerProps) {
  const [position, setPosition] = useState<Position | null>(null);
  const [mapType, setMapType] = useState<'satellite' | 'street'>('satellite');

  const handleConfirm = () => {
    if (!position) {
      alert("Joylashuv tanlanmadi");
      return;
    }
    onSelect(position);
  };

  // Turli xil map providers
  const tileUrls = {
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {/* Map type switcher */}
      <div style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
        display: "flex",
        gap: 8,
        background: "white",
        padding: 8,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
      }}>
        <button
          onClick={() => setMapType('satellite')}
          style={{
            padding: "8px 16px",
            background: mapType === 'satellite' ? "#0f766e" : "white",
            color: mapType === 'satellite' ? "white" : "#0f766e",
            border: "1px solid #0f766e",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          🛰️ Sun'iy yo'ldosh
        </button>
        <button
          onClick={() => setMapType('street')}
          style={{
            padding: "8px 16px",
            background: mapType === 'street' ? "#0f766e" : "white",
            color: mapType === 'street' ? "white" : "#0f766e",
            border: "1px solid #0f766e",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          🗺️ Ko'cha
        </button>
      </div>

      <MapContainer
        center={[39.420718, 67.239019]} // Urgut Krug
        zoom={18}
        style={{ height: "90%" }}
      >
        <TileLayer 
          url={tileUrls[mapType]}
          attribution={mapType === 'satellite' ? 
            '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' :
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
          maxZoom={19}
        />
        {position && <Marker position={[position.lat, position.lng]} />}
        <LocationMarker setPosition={setPosition} />
      </MapContainer>

      <button
        onClick={handleConfirm}
        style={{
          width: "100%",
          height: 60,
          background: "#0f766e",
          color: "white",
          fontSize: 18,
          border: "none",
          cursor: "pointer",
        }}
      >
        Manzilni tasdiqlash
      </button>
    </div>
  );
}