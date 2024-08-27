import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { mapGeoBounds } from "@/utils/stores/atoms";

export function useNearbyList() {
    const [mapBounds] = useAtom(mapGeoBounds);
    const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY || '' as string;

    console.log("Map Bounds:", mapBounds?.neLat, mapBounds?.neLng, mapBounds?.swLat, mapBounds?.swLng);

    const fetchNearbyListData = async () => {
        const url = 'https://travel-advisor.p.rapidapi.com/locations/v2/list-nearby?currency=BRL&units=km&lang=pt_BR';
        const options = {
            method: 'POST',
            headers: {
            'x-rapidapi-key': `${RAPID_API_KEY}`,
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            contentId: 'cc8fc7b8-88ed-47d3-a70e-0de9991f6604',
            contentType: 'restaurant',
            filters: [
                {
                id: 'placetype',
                value: [
                    'hotel',
                    'attraction',
                    'restaurant'
                ]
                },
                {
                id: 'minRating',
                value: ['30']
                }
            ],
            boundingBox: {
                northEastCorner: {
                latitude: -23.53626695194473,
                longitude: -46.628408274918066
                },
                southWestCorner: {
                latitude: -23.547106082841,
                longitude: -46.64181931999253
                }
            }
            })
        }

        try {
            const response = await fetch(url, options);
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
    });
    return query;
}



  