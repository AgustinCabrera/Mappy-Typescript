import { PlacesContext } from "./PlacesContext";
import { useReducer } from "react";
import { placesRedcuer } from "./placesReducer";
import { getUserLocation } from "../../helpers/getUserLocation";
import { useEffect } from "react";
import { SearchApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/places";


export interface PlaceState {
    isLoading: boolean;
    userLocation?: [number,number];
    isLoadingPlaces: boolean;
    palces: Feature[];

}
const INITIAL_STATE: PlaceState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    palces: [],
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

    const searchPlacesByTerm = async (query:string): Promise<Feature[]> => {
      if(query.length === 0) return []; // falta limpiar estate
      if(!state.userLocation) throw new Error ("No se ha podido obtener la ubicación del usuario");

      dispatch({type: "setLoadingPlaces", });
      
      const resp = await SearchApi.get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: state.userLocation.join(",")
        }
      });

      dispatch({type: "setPlaces", payload: resp.data.features});
      return resp.data.features;
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
