
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface CityMapProps {
  longitude: number;
  latitude: number;
  zoom?: number;
}

export const CityMap: React.FC<CityMapProps> = ({ longitude, latitude, zoom = 11 }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = "pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2tuZXhsaThxMGFkZTJ3bnpvdzdpsjs83i";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom,
      attributionControl: false
    });

    new mapboxgl.Marker({ color: "#6366f1" })
      .setLngLat([longitude, latitude])
      .addTo(map);

    // Hide mapbox logo for small demo
    map.once("style.load", () => {
      const logo = mapContainerRef.current?.querySelector(".mapboxgl-ctrl-logo");
      if (logo) (logo as HTMLElement).style.display = "none";
    });

    return () => {
      map.remove();
    };
  }, [longitude, latitude, zoom]);

  return (
    <div
      ref={mapContainerRef}
      className="rounded-lg shadow-md mt-3 w-full h-36 min-h-[120px] border"
      style={{ minWidth: 0 }}
      aria-label="City location map"
    />
  );
};
