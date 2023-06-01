import { useContext } from 'react'
import { MapContext } from '../context/map/MapContext'
import { PlacesContext } from '../context';
import { BtnContainer } from './BtnContainer';


export const BtnMyLocation = () => {

    const {map,isMapReady} = useContext(MapContext);
    const {userLocation} = useContext(PlacesContext);
    
    const onClick = () => {
        if (!isMapReady) throw new Error('Map is not ready');
        if (!userLocation) throw new Error('User Location does not exist yet');
        map?.flyTo({
            center: userLocation,
            zoom: 14,
         })
    }
  return (
    <div>
    <button
        className="btn btn-primary"
        onClick={onClick}
        style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 999,
            backgroundColor: 'gray',
            
        }}>
        <BtnContainer />
        </button>
        
        
  </div>
  )
}
