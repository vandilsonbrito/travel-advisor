'use client';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';
import { useAtom } from 'jotai';
import { mapGeoBounds, refecthNearbyList } from '@/utils/stores/atoms';


const containerStyle = {
    width: '100dwh',
    height: 'calc(100dvh - 90px)'
  };
  
  const center = { //Criar opção de Geolocator do web.navigator para ver resultados próximo do usuário
    lat: -23.539507115902488,
    lng: -46.63220789819972
  };

function Map() {
    
    const [mapBounds, setMapBounds] = useAtom(mapGeoBounds);
    const [refecthList, setRefetchList] = useAtom(refecthNearbyList);

    const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_KEY
      })
    
      const [map, setMap] = React.useState<google.maps.Map | null>(null);
      const mapRef = React.useRef<google.maps.Map | null>(null);
    
      const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        mapRef.current = map;
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null)
      }, [])
      
      const handleBoundsChanged = () => {
        if (mapRef.current) {
          const bounds = mapRef.current.getBounds();
          if (bounds) {
            const norteast = bounds.getNorthEast();
            const southwest = bounds.getSouthWest();

            const neLat = norteast.lat();
            const neLng = norteast.lng();
            const swLat = southwest.lat();
            const swLng = southwest.lng();

            setMapBounds({neLat, neLng, swLat, swLng });
            /* setRefetchList(true); */
            /* console.log("Map Bounds:", { neLat, neLng, swLat, swLng }); */
          }
        }
      };
      

    return (
        <section className="w-full h-full bg-slate-100" style={{ height: 'calc(100dvh - 90px)' }}>
            {
                isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={3}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        onBoundsChanged={handleBoundsChanged}
                    >
                        { /* Child components, such as markers, info windows, etc. */ }
                        <></>
                    </GoogleMap>
                ) : 
                <> </>
            }

        </section>
    )
}

export default React.memo(Map)
