import { useEffect } from "react"
import { Grid } from "@mui/material"

import { usePlacesStore } from "../stores/placesStore";
import { Loading } from "../components/Loading";
import { SortTable, SearchBar, Toolbar, PlaceModal } from "./components";


export const PlacesPage = () => {
    const {getAllPlaces, places, isLoadingData, visitedFilter, filterAllPlaces, placesFiltered, searchingTextFilter, searchingFieldFilter} = usePlacesStore();

    useEffect(()=>{
      getAllPlaces()
    }, [visitedFilter])
  
    useEffect(()=>{
      filterAllPlaces()
    }, [places, searchingTextFilter, searchingFieldFilter])

  return (
    <Grid container justifyContent={"center"}>
        {isLoadingData?<Loading/>:false}
        <PlaceModal/>
        <Grid item xs={12} sm={12} md={10} lg={8} xl={8}>
            <Toolbar/>
            <SearchBar/>
            <SortTable rows={placesFiltered}/>
        </Grid>
    </Grid>
  )
}
