import { PlacesContext } from "./PlacesContext";
import { useReducer } from "react";
import { placesRedcuer } from "./placesReducer";
import { getUserLocation } from "../../helpers/getUserLocation";
import { useEffect } from "react";
import { SearchApi } from "../../apis";

export interface PlaceState {
    isLoading: boolean;
    userLocation?: [number,number];
}
const INITIAL_STATE: PlaceState = {
    isLoading: true,
    userLocation: undefined
}
interface Props {
    children: JSX.Element|JSX.Element[];
}

export const PlacesProvider = ({children}:Props) => {
    const [state, dispatch] = useReducer(placesRedcuer, INITIAL_STATE);

    useEffect(() => {
           getUserLocation()
           .then((lnglat) => dispatch({type: "setUserLocation", payload: lnglat})) 
    }, []);

    const searchPlacesByTerm = async (query:string) => {
      if(query.length === 0) return []; // falta limpiar estate
      if(!state.userLocation) throw new Error ("No se ha podido obtener la ubicación del usuario");
      
      const resp = await SearchApi.get(`/${query}.json`, {
        params: {
          proximity: state.userLocation.join(","),
        }
      });
      console.log(resp.data);
      return resp.data;
    }
    

  return (
    <PlacesContext.Provider value={{
      ...state,
      //methods
      searchPlacesByTerm
    }}>
        {children}

    </PlacesContext.Provider>
  )
}
