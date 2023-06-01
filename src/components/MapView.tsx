import React, { useContext, useLayoutEffect, useRef } from 'react'
import { PlacesContext } from '../context'
import { Loading } from './'
import {Map} from 'mapbox-gl'
import { MapContext } from '../context/map/MapContext'



export const MapView = () => {
    const {isLoading, userLocation} = useContext(PlacesContext)
    const { setMap } = useContext (MapContext)
    
    const mapDiv= useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if( !isLoading ){
            const map = new Map({
                container: mapDiv.current!, 
                style: 'mapbox://styles/mapbox/light-v10',
                center: userLocation,
                zoom: 14 
                });
                setMap(map);
            }
            }, [isLoading] )

      

        


    if (isLoading) {
        return (<Loading />)
    }

    return (
        <div ref={ mapDiv }
        style={
            {
                width: '100vw',
                height: '100vh',
                left: 0,
                top: 0,
                position:'fixed',
        }}
        >

            {userLocation?.join(',')}
        </div>
    )
}
