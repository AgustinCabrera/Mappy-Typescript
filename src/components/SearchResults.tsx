import {useContext, useState} from "react";
import { PlacesContext } from "../context";
import { LoadingPlaces } from "./LoadingPlaces";
import { MapContext } from "../context/map/MapContext";
import { Feature } from "../interfaces/places";


export const SearchResults = () => { // a futuro crear search result item
  
  const {places, isLoadingPlaces,userLocation} = useContext(PlacesContext);
  const {map,getRouteBetweenPoints} = useContext(MapContext)

  const [activeId,setActiveId] = useState('');
  

  const onPlaceClicked = (place: Feature) => {
    const [lng, lat] = place.center;
    setActiveId(place.id);
    map?.flyTo({
      center: [lng,lat],
      zoom: 15
    })
  }

const getRoute = (place: Feature) => {
  if(!userLocation){
    return;
  }
  const [lng, lat] = place.center;
  getRouteBetweenPoints(userLocation,[lng, lat]);
}
  


  if(isLoadingPlaces){
    return <LoadingPlaces />
  }

  if(places.length === 0){
    return <></>;
  }
  
  return (
    <ul className= "List-group mt-3">
      {
        places.map((place) => (
          <li 
            className={`list-group-item list-group-item-action pointer 
            ${(activeId === place.id) ? 'active' : ''}`} 
            key={place.id}
            onClick={() => onPlaceClicked(place)}
            >
            <h6 style={{
              fontSize: "20px"
            }}>{place.text}</h6>
            <p
              className="text-muted" 
              style={{
                fontSize: "12px"
              }}
            >
              {place.place_name}
            </p>
            <button
            onClick={() => getRoute(place)}
            className={`btn btn-sm ${ activeId === place.id ? 'btn-outline-light':'btn-outline-primary'}`}>
              Directions
            </button>
          </li>
        ))
      }
    </ul>
  )
}
