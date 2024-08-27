import { atom, Atom } from "jotai";
import { MapGeoBoundsInterface } from "../types/types";

export const mapGeoBounds = atom<MapGeoBoundsInterface>();
export const refecthNearbyList = atom<boolean>(false);