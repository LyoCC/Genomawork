import { create } from 'zustand';

import { placesApi, Place, PlaceBodyUpdate, PlaceBodyCreate } from '../api/placesApi'
import { FieldFilter, VisitedFilter } from '../places/components/SearchBar/types';

interface PlacesState{
    places: Place[];
    isLoadingData: boolean;
    isModalOpen: boolean;
    isModalEditMode: boolean;
    idToEdit: number | undefined;
    visitedFilter: VisitedFilter;
    searchingTextFilter: string;
    searchingFieldFilter: FieldFilter;
    placesFiltered: Place[]
    
    getAllPlaces: () => Promise<void>;
    updatePlace: (body: PlaceBodyUpdate , id: number) => Promise<void>;
    addPlace: (body: PlaceBodyCreate) => Promise<void>;
    deletePlace: (id: number) => Promise<void>;

    setModalStatus: (modalStatus: boolean, editMode: boolean, id?: number) => void;

    setVisitedFilter: (option: VisitedFilter) => void;
    setSearchingFieldFilter: (option: FieldFilter) => void;
    setSearchingText: (text: string) => void;
    filterAllPlaces: () => void;

}

export const usePlacesStore = create<PlacesState>()((set: ( state: Partial<PlacesState> ) => void, get:() => PlacesState) => ({
    places: [],
    isLoadingData: false,
    isModalEditMode: false,
    isModalOpen: false,
    idToEdit: undefined,

    visitedFilter: VisitedFilter.ALL,
    searchingTextFilter: "",
    searchingFieldFilter: FieldFilter.ALL,
    placesFiltered: [],

    getAllPlaces: () => startLoadingPlaces(set, get),
    updatePlace: (body: PlaceBodyUpdate , id: number) => startUpdatingPLace(set, get, body, id),
    addPlace: (body: PlaceBodyCreate ) => startCratingPlace(set, get, body),
    deletePlace: (id: number) => startDeletingPlace(set, get, id),

    setModalStatus: (modalStatus: boolean, editMode: boolean, id?: number) => setModalStatus(set, modalStatus, editMode, id),

    setVisitedFilter: (option: VisitedFilter) => setVisitedFilter(set, option),
    setSearchingFieldFilter: (option: FieldFilter) => setSearchingFieldFilter(set, option),
    setSearchingText: (text: string) => setSearchingText(set, text),
    filterAllPlaces: () => filterAllPlaces(set, get),
   
}))

const filterAllPlaces = (set: ( state: Partial<PlacesState> ) => void, get:() => PlacesState) =>{
    const field = get().searchingFieldFilter
    const text  = get().searchingTextFilter.toLocaleLowerCase()
    const places = get().places
    const placesFiltered = places.filter((place) => {
        if(field == FieldFilter.ALL){
            if(place.name?.toLocaleLowerCase().includes(text) || 
                place.foodType?.toLocaleLowerCase().includes(text) || 
                place.city?.toLocaleLowerCase().includes(text) || 
                place.country?.toLocaleLowerCase().includes(text)
            ) 
                return true
            else
                return false
        }
        if(place[field]?.toLocaleLowerCase().includes(text)) 
            return true
        else    
            return false
    })
    set({placesFiltered: placesFiltered})
}

const setSearchingText = (set: ( state: Partial<PlacesState> ) => void, text: string) => {
    set({searchingTextFilter: text})
}

const setSearchingFieldFilter = (set: ( state: Partial<PlacesState> ) => void, option: FieldFilter) => {
    set({searchingFieldFilter: option})
}
const setVisitedFilter = (set: ( state: Partial<PlacesState> ) => void, option: VisitedFilter) => {
    set({visitedFilter: option})
}

const setModalStatus = (set: ( state: Partial<PlacesState> ) => void, modalStatus: boolean, editMode: boolean, id?: number) => {
    set({isModalEditMode: editMode, isModalOpen: modalStatus, idToEdit:id})
}

const startLoadingPlaces = async (set: ( state: Partial<PlacesState> ) => void, get:() => PlacesState) => {
    set({ isLoadingData: true });             
    try {      
        let response;
        if(get().visitedFilter == VisitedFilter.ALL)
            response = await placesApi.get("/all")
        else
            response = await placesApi.get("/visited", {params:{option:get().visitedFilter == VisitedFilter.VISITED}})
        const data: Place[] = response.data
        data.map((place) => place.location = getLocation(place)) 
        set({ places: data, isLoadingData: false });
    } catch (error) {
        console.log("error loading places")
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
