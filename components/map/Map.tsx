'use client';
import { GoogleMap, useJsApiLoader, OverlayView, Marker } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { mapGeoBounds, refecthNearbyList, restaurantsAPIData } from '@/utils/stores/atoms';


  const containerStyle = {
    width: '100dwh',
    height: 'calc(100dvh - 90px)'
  };

  function Map() {
      
      const [, setMapBounds] = useAtom(mapGeoBounds);
      const [refetchList, setRefetchList] = useAtom(refecthNearbyList);
      const [restaurantsData] = useAtom(restaurantsAPIData);
      const [usersLocation, setUsersLocation] = useState<google.maps.LatLng | google.maps.LatLngLiteral>();

      /* Pega localização do usuário */
      useEffect(() => {
        const success = (pos:any) => {
          const coord = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }
          setUsersLocation(coord);
        }
        const error = () => {
          console.log("error", error)
        }
        navigator.geolocation.getCurrentPosition(success, error);
      }, [])

      useEffect(() => {
          console.log(restaurantsData)
      }, [restaurantsData])

      const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
      const { isLoaded } = useJsApiLoader({
          id: 'google-map-script',
          googleMapsApiKey: GOOGLE_MAPS_KEY
      })
      
      const [map, setMap] = React.useState<google.maps.Map | null>(null);
      const mapRef = React.useRef<google.maps.Map | null>(null);
    
      /* Carrega o mapa e seta o zoom inicial */
      const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        mapRef.current = map;
        const bounds = new window.google.maps.LatLngBounds(usersLocation);
        setTimeout(() => {
          map.fitBounds(bounds);
          const desiredZoom = 17;
          map.setZoom(desiredZoom);
          setMap(map);
        }, 500);
      }, [usersLocation])
    
      const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
        setMap(null)
      }, [])
        
      const handleBoundsChanged = React.useCallback(() => {
        let timeoutResize;
        clearTimeout(timeoutResize);
        
        timeoutResize = setTimeout(() => {
            if (mapRef.current) {
            const bounds = mapRef.current.getBounds();
            console.log("Bounds Changed");
            if (bounds) {
                console.log("########PASSOUUU");
                const norteast = bounds.getNorthEast();
                const southwest = bounds.getSouthWest();

                const neLat = norteast.lat();
                const neLng = norteast.lng();
                const swLat = southwest.lat();
                const swLng = southwest.lng();

                setMapBounds({neLat, neLng, swLat, swLng });
                console.log("---refetchList-------", refetchList);
                if(!refetchList) {
                  setRefetchList(true);              
                }     
            }
          };  
        }, 500);
      }, [refetchList, mapRef]);

      useEffect(() => {
        if (refetchList) {
          const timeoutSetRefetch = setTimeout(() => {
            setRefetchList(false);
          }, 500);
          return () => clearTimeout(timeoutSetRefetch);
        }
      }, [refetchList])

      return (
        <section className="w-full h-full relative bg-slate-100" style={{ height: 'calc(100vh - 90px)' }}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={usersLocation}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onBoundsChanged={handleBoundsChanged}
              >
                {restaurantsData ? (
                  restaurantsData.map((restaurant, index) => (
                    <Marker
                      key={index}
                      position={{
                        lat: parseFloat(restaurant.lat),
                        lng: parseFloat(restaurant.lon)
                      }}
                      
                    />
                  ))
                ) : 
                (
                  <></>
                )}
              </GoogleMap>
            ) : (
              <></>
            )}
      </section>
      )
  }

export default React.memo(Map)
