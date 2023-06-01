import { Map, Marker } from "mapbox-gl"
import { useReducer } from "react"
import { MapContext } from "./MapContext"
import { mapReducer } from "./mapReducer"
import { Popup } from "mapbox-gl"


export interface MapState {
    isMapReady: boolean,
    map?: Map
}
const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
}
interface Props{
    children: JSX.Element | JSX.Element[];
} 

export const MapProvider = ({children}:Props) => {
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
   
    const setMap = (map:Map) => {

        const myLocationPopup = new Popup()
            .setHTML(`
                <h1 
                style="
                color: black;
                font-size: 1.5rem;
                font-weight: 600;
                "
                >
                 Location
                </h1>
                `)
        


        new Marker({
            color: 'gray',
        })
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopup)
            .addTo(map);

        
        dispatch({
            type: 'setMap',
            payload: map
        })
    }

  return (
    <MapContext.Provider value={{
        ...state,
        setMap,
    }}>
        {children}
    </MapContext.Provider>
  )
}