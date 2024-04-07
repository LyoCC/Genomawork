import { Grid, FormControl, InputLabel, TextField, Select, MenuItem, SelectChangeEvent} from "@mui/material"

import { usePlacesStore } from "../../../stores/placesStore"
import {FieldFilter, VisitedFilter} from "./types"

export const SearchBar = () => {
    const {setVisitedFilter, visitedFilter, searchingTextFilter, setSearchingText, searchingFieldFilter, setSearchingFieldFilter} = usePlacesStore()

    const onChangeVisitedFilter = (event: SelectChangeEvent<HTMLInputElement>) => {
        const option: VisitedFilter = event.target.value as VisitedFilter
        setVisitedFilter(option)
    }
    const onChangeSearchingFieldFilter = (event: SelectChangeEvent<HTMLInputElement>) => {
        const option: FieldFilter = event.target.value as FieldFilter
        setSearchingFieldFilter(option)
    }

    const onChangeSearchingText = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const text = event.target.value
        setSearchingText(text)
    }

    return(
        <Grid container sx={{backgroundColor:"#f175a5"}}>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <TextField 
                    value={searchingTextFilter}
                    onChange={onChangeSearchingText}
                    fullWidth label="Buscar" variant="filled" color='primary' 
                    sx={{ backgroundColor:"white"}} 
                /> 
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="search-for-label">Buscar por:</InputLabel>
                    <Select 
                        value={searchingFieldFilter}
                        onChange={onChangeSearchingFieldFilter}
                        sx={{backgroundColor:"white", borderRadius:0, "& .MuiSelect-select":{backgroundColor:"white", ":focus":{backgroundColor:"white"}}}}  
                        labelId="search-for-label" defaultValue={FieldFilter.ALL}
                    >
                        <MenuItem value={FieldFilter.ALL}>Todos</MenuItem>
                        <MenuItem value={FieldFilter.NAME}>Nombre</MenuItem>
                        <MenuItem value={FieldFilter.FOOD_TYPE}>Tipo de comida</MenuItem>
                        <MenuItem value={FieldFilter.COUNTRY}>Pais</MenuItem>
                        <MenuItem value={FieldFilter.CITY}>Ciudad</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3} justifyContent={"flex-end"} display={"flex"} alignItems={"center"}>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <FormControl variant="filled" fullWidth>
                    <InputLabel id="visited-filter-label">Mostrar</InputLabel>
                    <Select 
                        onChange={onChangeVisitedFilter}
                        value={visitedFilter as string}
                        sx={{backgroundColor:"white", borderRadius:0, "& .MuiSelect-select":{backgroundColor:"white", ":focus":{backgroundColor:"white"}}}}   
                        labelId="visited-filter-label" defaultValue={VisitedFilter.ALL as string} 
                    >
                        <MenuItem value={VisitedFilter.ALL}>Todos</MenuItem>
                        <MenuItem value={VisitedFilter.VISITED}>Visitados</MenuItem>
                        <MenuItem value={VisitedFilter.UNVISITED}>No visitados</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

        </Grid>
    )
}