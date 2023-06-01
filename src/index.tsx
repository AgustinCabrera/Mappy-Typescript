import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
mapboxgl.accessToken = 'pk.eyJ1IjoiYWd1c3RpbmNhYnJlcmEiLCJhIjoiY2xnbTlyejcxMDNudzNwdGFoNGJyejUxdCJ9.QdeYrur31q22nXB0AiNoUw';


if(!navigator.geolocation) {
alert ("Geolocation is not supported by your browser");
throw new Error("Geolocation is not supported by your browser");
}





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
