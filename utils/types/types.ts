export interface MapGeoBoundsInterface {
    neLat: number,
    neLng: number,
    swLat: number,
    swLng: number
}

export interface APIRestaurantsDataInterface {
    lat: string,
    lon: string,
    tags: {
        amenity: string,
        name: string
    }
}
