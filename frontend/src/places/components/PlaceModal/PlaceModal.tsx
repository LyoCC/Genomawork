import { Button, Grid, TextField, Typography, Modal, IconButton, Checkbox, FormControlLabel } from "@mui/material"
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

import { usePlacesStore } from "../../../stores/placesStore";

const modalStyle = {
    position: 'absolute', 
    top: '5%',
    left: '5%',
    width: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #f175a5',
    boxShadow: 24,
    p: 4,
}

const TextFieldModal = ({...props}) => {
    return(
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField fullWidth variant="standard" {...props} />
        </Grid>
    )
}

export const PlaceModal = () =>{
        const {setModalStatus, isModalOpen, isModalEditMode, idToEdit} = usePlacesStore()

        const closeModal = () => {
            setModalStatus(false, false);
        }

        return(
            <Modal
                open={isModalOpen}
                onClose={closeModal}
            >
                <Grid container sx={modalStyle}>  
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} display={"flex"} alignItems={"center"} justifyContent={"left"}>                          
                        <Typography fontWeight={"bold"}>
                            {isModalEditMode?"Editar Local":"Nuevo Local"}
                        </Typography>
                    </Grid>                
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>  
                    {isModalEditMode?
                        <IconButton aria-label="delete" color="error">
                            <DeleteForeverTwoToneIcon sx={{fontSize:30}}/>                            
                        </IconButton>
                        :false
                    }                        
                    </Grid>  
                    <TextFieldModal required
                        name="name"
                        label="Nombre"

                    />
                    <TextFieldModal 
                        name="foodType"
                        label="Tipo de comida" 
                    />
                    <TextFieldModal 
                        name="city"
                        label="Ciudad" 
                    />
                    <TextFieldModal 
                        name="country"
                        label="Pais" 
                    />
                    <TextFieldModal 
                        name="rating"
                        label="Calificacion" 
                        type="number"
                    />
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} alignItems={"flex-end"} justifyContent={"flex-start"} display={"flex"}>
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                            />
                        } label="Visitado" />                        
                    </Grid>       
                    <Grid container display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{mt:3}}>  
                        <Button variant="contained" sx={{height:30}} color="error" onClick={closeModal}>Cancelar</Button>
                        <Button variant="contained" sx={{height:30}} color="primary">Guardar</Button>
                    </Grid>      
                </Grid>                
            </Modal>
        )
}