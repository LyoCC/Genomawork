import axios from 'axios';

const env = import.meta.env

export const placesApi = axios.create({
    baseURL: env.VITE_API_PLACES_BASE_URL
});

export interface Place{
    id: number;
    name: string;
    city: string  | null;
    country: string | null;
    foodType: string | null;
    rating: number | null;
    visited: boolean;
    location: string | null;
}

export interface PlaceBodyUpdate{
    name: string | undefined;
    city: string  | undefined;
    country: string | undefined;
    foodType: string | undefined;
    rating: number | undefined;
    visited: boolean  | undefined;
    location: string | undefined;
}

export interface PlaceBodyCreate{
    name: string ;
    city: string  | undefined;
    country: string | undefined;
    foodType: string | undefined;
    rating: number | undefined;
    visited: boolean  | undefined;
    location: string | undefined;
}

