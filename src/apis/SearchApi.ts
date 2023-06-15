import axios from "axios";

 const SearchApi = axios.create({ 
        baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
        params: {
            limit: 5,
            language: "en",
            accesToken:'pk.eyJ1IjoiYWd1c3RpbmNhYnJlcmEiLCJhIjoiY2xnbTl5anlyMDNzaTNqczRzbGtmZTlnMCJ9.grcPmcSkTLOmGbe9P8bFlg'
            
        }
 }) 
export default SearchApi;