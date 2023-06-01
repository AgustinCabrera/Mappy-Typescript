import { PlaceState } from "./PlacesProvider";

type PlacesAction={type: 'setUserLocation',payload:[number,number]};

export const placesRedcuer = (state:PlaceState,action:PlacesAction): PlaceState => {

switch (action.type) {
    case 'setUserLocation':
        return {
            ...state,
            isLoading: false,
            userLocation:action.payload};
    default:
        return state;
    }
}
