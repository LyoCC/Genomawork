import { Grid, Button, Typography} from "@mui/material"
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import { usePlacesStore } from "../../../stores/placesStore";

export const Toolbar = () => {
    const {setModalStatus} = usePlacesStore()

    const  openModal = () => {
        setModalStatus(true, false)
    }

    return(
        <Grid container sx={{backgroundColor:"#f175a5"}} p={3} >
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} display={"flex"} alignItems={"center"} >
                <Typography sx={{color: "white"}} variant="h4">Locales de comida</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} justifyContent="flex-end" display={"flex"} alignItems={"center"}>
                <Button 
                    onClick={openModal}
                    variant="contained" 
                    sx={{height:50}} 
                    endIcon={<AddBusinessIcon/>}    
                >
                    Agregar
                </Button>                
            </Grid>
        </Grid>
    )
}