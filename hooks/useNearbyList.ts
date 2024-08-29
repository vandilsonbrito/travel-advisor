import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { mapGeoBounds } from "@/utils/stores/atoms";

export function useNearbyList() {
    const [mapBounds] = useAtom(mapGeoBounds);

    const fetchNearbyListData = async () => {
        try {
            const response = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node['amenity'='restaurant'](${mapBounds?.swLat}, ${mapBounds?.swLng}, ${mapBounds?.neLat}, ${mapBounds?.neLng});out body 50;`);
            const data = await response.json();
            return data;
          } 
          catch (error) {
            console.error(error);
          }   
    }

    const query = useQuery({
        queryFn: fetchNearbyListData,
        queryKey: ['nearby-list'],
        enabled: !!(mapBounds?.neLat && mapBounds?.neLng && mapBounds?.swLat && mapBounds?.swLng)
    });
    return query;
}



  