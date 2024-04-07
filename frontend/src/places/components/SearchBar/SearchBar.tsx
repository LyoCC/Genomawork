import { Grid, FormControl, InputLabel, TextField, Select, MenuItem} from "@mui/material"

import {FieldFilter, VisitedFilter} from "./types"

export const SearchBar = () => {
    return(
        <Grid container sx={{backgroundColor:"#f175a5"}}>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <TextField 
                    fullWidth label="Buscar" variant="filled" color='primary' 
                    sx={{ backgroundColor:"white"}} 
                /> 
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="search-for-label">Buscar por:</InputLabel>
                    <Select 
                        sx={{backgroundColor:"white", borderRadius:0, ".MuiSelect-filled":{backgroundColor:"white", ":selected":{backgroundColor:"white"}}}}  
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
                        sx={{backgroundColor:"white", borderRadius:0, ".MuiSelect-filled":{backgroundColor:"white", ":selected":{backgroundColor:"white"}}}}  
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