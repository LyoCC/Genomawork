import { create } from 'zustand';

import { placesApi, Place, PlaceBodyUpdate, PlaceBodyCreate } from '../api/placesApi'

interface PlacesState{
    places: Place[];
    isLoadingData: boolean;
    isModalOpen: boolean;
    isModalEditMode: boolean;
    idToEdit: number | undefined;
    
    getAllPlaces: () => Promise<void>;
    updatePlace: (body: PlaceBodyUpdate , id: number) => Promise<void>;
    addPlace: (body: PlaceBodyCreate) => Promise<void>;
    deletePlace: (id: number) => Promise<void>;

    setModalStatus: (modalStatus: boolean, editMode: boolean, id?: number) => void;

}

export const usePlacesStore = create<PlacesState>()((set: ( state: Partial<PlacesState> ) => void, get:() => PlacesState) => ({
    places: [],
    isLoadingData: false,
    isModalEditMode: false,
    isModalOpen: false,
    idToEdit: undefined,

    getAllPlaces: () => startLoadingPlaces(set),
    updatePlace: (body: PlaceBodyUpdate , id: number) => startUpdatingPLace(set, get, body, id),
    addPlace: (body: PlaceBodyCreate ) => startCratingPlace(set, get, body),
    deletePlace: (id: number) => startDeletingPlace(set, get, id),

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

const startCratingPlace = async(set: ( state: Partial<PlacesState> ) => void, get:() => PlacesState, body: PlaceBodyCreate) => {
    set({ isLoadingData: true });             
    try {              
        const response = await placesApi.post(`/add`,{...body})
        //update localy
        if(response.status == 201 ){
            const newPlace = {...body} as Place
            newPlace.id = response.data
            newPlace.location = getLocation(newPlace)
            const placesUdated = [...get().places, newPlace]
            set({ isLoadingData: false, places:  placesUdated});
        }
        else{
            //TODO: show error to cliente: probably 422 validation error
            set({ isLoadingData: false });
        }
    }
    catch(error){
        console.log("Error creating a place")
        console.log(error)
        set({ isLoadingData: false });
    }
}

const startUpdatingPLace = async(set: ( state: Partial<PlacesState> ) => void, get:() => PlacesState, body: PlaceBodyUpdate, id: number) => {
    set({ isLoadingData: true });             
    try {              
        const response = await placesApi.patch(`/update/${id}`,{...body})
        if(response.status == 200 ){
            //update localy
            const placesUdated = get().places.map((place) => {
                if(place.id == id){
                    const updatedPlace = {...place, ...body} as Place
                    updatedPlace.location = getLocation(updatedPlace)
                    return updatedPlace
                }
                else return place
            })
            set({ isLoadingData: false, places:  placesUdated});
        }
        else{
            //TODO: show error to cliente, probably: 404 (place do not exist) | 422 validation error
            set({ isLoadingData: false });
        }
    } catch (error) {
        console.log("Error loading places")
        console.log(error)
        set({ isLoadingData: false });
    }    

}

const startDeletingPlace = async(set: ( state: Partial<PlacesState> ) => void, get:() => PlacesState, id: number) => {
    set({ isLoadingData: true });             
    try {              
        const response = await placesApi.delete(`/delete/${id}`)
        if(response.status == 200 ){
            const placesUdated = get().places.filter(place => place.id != id)
            set({ isLoadingData: false, places:  placesUdated});
        }
        else{
            //TODO: show error to cliente, probably: 404 (place do not exist) | 422 validation error
            set({ isLoadingData: false });
        }
    } catch (error) {
        console.log("Error on deleting a place")
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
