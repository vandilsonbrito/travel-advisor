import { atom, Atom } from "jotai";
import { MapGeoBoundsInterface, APIRestaurantsDataInterface } from "../types/types";

export const mapGeoBounds = atom<MapGeoBoundsInterface>();
export const refecthNearbyList = atom<boolean>(false);
export const restaurantsAPIData = atom<APIRestaurantsDataInterface[]>()