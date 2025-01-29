import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Paper, Typography } from '@mui/material';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Map = () => {
  // Replace with your city's latitude and longitude
  const cityCoordinates = [14.628434,  -90.522713]; // Example: London

  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Map of THE City
      </Typography>
      <MapContainer
        center={cityCoordinates}
        zoom={15}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={cityCoordinates}>
          <Popup>
            Your City
          </Popup>
        </Marker>
      </MapContainer>
    </Paper>
  );
};

export default Map;