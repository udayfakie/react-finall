import { FunctionComponent, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const SetView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const Map: FunctionComponent = () => {
  const position: [number, number] = [32.0853, 34.7818];

  return (
    <MapContainer
      style={{ height: "250px", width: "100%" }} 
    >
      <SetView center={position} zoom={13} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>Hello!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
