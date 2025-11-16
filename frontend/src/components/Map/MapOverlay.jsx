


// File: MapOverlay.jsx

/**
 * MapOverlay
 * -------------------------
 * Leaflet map overlay for robot visualization.
 * Displays robot position, path (polyline), and heading.
 * Supports full path from gpsData array.
 * Can be combined with AROverlay.
//  */


import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";

import React, { useEffect, useRef, useState } from "react"; // Added useState

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapOverlay = ({ gpsData, odomData }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const polylineRef = useRef(null); // Added polylineRef

  const [path, setPath] = useState([]); // State to store path
  path
  // --- Initialize map ---
  useEffect(() => {
    if (!mapRef.current && gpsData) {
      mapRef.current = L.map("mapOverlay", {
        center: [gpsData.lat, gpsData.lon],
        zoom: 16,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Initial marker
      markerRef.current = L.marker([gpsData.lat, gpsData.lon], {
        rotationAngle: 0,
        rotationOrigin: "center center",
      }).addTo(mapRef.current);

      // Initial polyline
      polylineRef.current = L.polyline([], { color: "cyan", weight: 3 }).addTo(mapRef.current);
    }
  }, [gpsData]);

  // --- Update marker, heading, and path ---
  useEffect(() => {
    if (!mapRef.current || !gpsData || !markerRef.current) return;

    // Update marker position
    markerRef.current.setLatLng([gpsData.lat, gpsData.lon]);

    // Update heading from odomData
    if (odomData && odomData.orientation) {
      const { x, y, z, w } = odomData.orientation;
      const siny_cosp = 2 * (w * z + x * y);
      const cosy_cosp = 1 - 2 * (y * y + z * z);
      const yaw = Math.atan2(siny_cosp, cosy_cosp); // radians
      const angleDeg = (yaw * 35) / Math.PI;
      markerRef.current.setRotationAngle?.(angleDeg); // Safe call
    }

    // --- Update path and polyline ---
    setPath(prev => {
      const newPath = [...prev, [gpsData.lat, gpsData.lon]]; // Add new GPS point
      if (polylineRef.current) {
        polylineRef.current.setLatLngs(newPath); // Update polyline on map
      }
      return newPath;
    });

  }, [gpsData, odomData]);

  // --- Center on Vehicle button ---
  const centerOnVehicle = () => {
    if (mapRef.current && gpsData) {
      mapRef.current.setView([gpsData.lat, gpsData.lon], mapRef.current.getZoom());
    }
  };
  
  return (
    <div style={{ position: "relative" }}>
      <div
        id="mapOverlay"
        style={{
          width: "1200px",
          height: "650px",
          margin: "0 16px",
          borderRadius: "12px",
          overflow: "hidden",
          filter: "drop-shadow(0 0 8px rgba(0,255,255,0.6))",
        }}
      />

      <button
        onClick={centerOnVehicle}
        style={{
          position: "absolute",
          top: 520,
          left: 50,
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#0D3B66",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#00FFE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="2" x2="12" y2="6"/>
          <line x1="12" y1="18" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="6" y2="12"/>
          <line x1="18" y1="12" x2="22" y2="12"/>
        </svg>
      </button>
    </div>
  );
};

export default MapOverlay;
