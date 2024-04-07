import { create } from 'zustand';

import { placesApi, Place } from '../api/placesApi'

interface PlacesState{
    places: Place[];
    isLoadingData: boolean;
    isModalOpen: boolean;
    isModalEditMode: boolean;
    idToEdit: number | undefined;
    
    getAllPlaces: () => Promise<void>;
    setModalStatus: (modalStatus: boolean, editMode: boolean, id?: number) => void;

}

export const usePlacesStore = create<PlacesState>()((set: ( state: Partial<PlacesState> ) => void, get:() => PlacesState) => ({
    places: [],
    isLoadingData: false,
    isModalEditMode: false,
    isModalOpen: false,
    idToEdit: undefined,

    getAllPlaces: () => startLoadingPlaces(set),
    setModalStatus: (modalStatus: boolean, editMode: boolean, id?: number) => setModalStatus(set, modalStatus, editMode, id),
   
}))

const setModalStatus = (set: ( state: Partial<PlacesState> ) => void, modalStatus: boolean, editMode: boolean, id?: number) => {
    set({isModalEditMode: editMode, isModalOpen: modalStatus, idToEdit:id})
}

const startLoadingPlaces = async (set: ( state: Partial<PlacesState> ) => void) => {
    set({ isLoadingData: true });             
    try {      
        const response= await placesApi.get("/all")
        const data: Place[] = response.data
        data.map((place) => place.location = getLocation(place)) 
        set({ places: data, isLoadingData: false });
    } catch (error) {
        console.log("Error loading places")
        console.log(error)
        set({ isLoadingData: false });
    }    
}

function getLocation(place: Place): string | null {
    if (place.city && place.country) {
        return `${place.city}, ${place.country}`;
    } else if (place.city) {
        return place.city;
    } else if (place.country) {
        return place.country;
    } else {
        return null;
    }
}
