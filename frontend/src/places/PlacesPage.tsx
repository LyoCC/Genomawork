import { useEffect } from "react"
import { Typography } from "@mui/material"

import { usePlacesStore } from "../stores/placesStore";




export const PlacesPage = () => {
    const {getAllPlaces, places} = usePlacesStore();

    useEffect(()=>{
        getAllPlaces()
    }, [])

  return (
    <>           
      <Typography>{JSON.stringify(places)}</Typography>
    </>
  )
}
