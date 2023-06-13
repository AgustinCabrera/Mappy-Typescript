import axios from "axios";

 const directionsApi = axios.create({ 
        baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
        params: {
            geometries: "geojson",
            steps: false,
            alternatives: false,
            overview: 'simplified',
            accesToken:'pk.eyJ1IjoiYWd1c3RpbmNhYnJlcmEiLCJhIjoiY2xnbTlyejcxMDNudzNwdGFoNGJyejUxdCJ9.QdeYrur31q22nXB0AiNoUw'
            
        }
 })
export default directionsApi;