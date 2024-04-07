import { Button, Grid, TextField, Typography, Modal, IconButton, Checkbox, FormControlLabel } from "@mui/material"
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { useEffect } from "react";

import { useForm } from "../../../hooks/useForm"
import { usePlacesStore } from "../../../stores/placesStore";
import { PlaceBodyCreate } from "../../../api/placesApi";

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

const initialState = {
    name: "",
    foodType: "",
    city: "",
    country: "",
    rating: undefined,
    visited: false
}

export const PlaceModal = () =>{
        const {setModalStatus, isModalOpen, isModalEditMode, idToEdit, places, updatePlace, addPlace, deletePlace} = usePlacesStore()
        const {name, foodType, city, country, rating, visited, onInputChange, onResetForm, setForm, formState} = useForm(initialState)

        useEffect(()=>{
            if(isModalEditMode){
                const initData = {...places.find((place) => place.id === idToEdit)}
                delete initData.id
                delete initData.location
                setForm({...initialState,...initData })
            }
            else  onResetForm()
        }, [isModalEditMode])
        

        const closeModal = () => {
            setModalStatus(false, false);
            onResetForm()
        }

        const submitForm = () =>{
            const body = {...formState} as PlaceBodyCreate            
            if(body.name.trim().length < 3){
                console.log("error name must be have 3 letter min")
                return
            }
            if(isModalEditMode) updatePlace(body , idToEdit!);
            else addPlace(body)

            closeModal()
        }

        const onDelete = () =>{
            const num = idToEdit!;
            closeModal()
            deletePlace(num)
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
                        <IconButton aria-label="delete" color="error" onClick={onDelete}>
                            <DeleteForeverTwoToneIcon sx={{fontSize:30}}/>                            
                        </IconButton>
                        :false
                    }                        
                    </Grid>  
                    <TextFieldModal required
                        value={name}
                        onChange={onInputChange}
                        name="name"
                        label="Nombre"

                    />
                    <TextFieldModal 
                        value={foodType}                        
                        onChange={onInputChange}
                        name="foodType"
                        label="Tipo de comida" 
                    />
                    <TextFieldModal 
                        value={city}
                        onChange={onInputChange}
                        name="city"
                        label="Ciudad" 
                    />
                    <TextFieldModal 
                        value={country}
                        onChange={onInputChange}
                        name="country"
                        label="Pais" 
                    />
                    <TextFieldModal 
                        value={rating}
                        onChange={onInputChange}
                        name="rating"
                        label="Calificacion" 
                        type="number"
                    />
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} alignItems={"flex-end"} justifyContent={"flex-start"} display={"flex"}>
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                                onChange={() =>onInputChange({target:{name:"visited",value:!visited}})}
                                checked={visited}
                            />
                        } label="Visitado" />                        
                    </Grid>       
                    <Grid container display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{mt:3}}>  
                        <Button variant="contained" sx={{height:30}} color="error" onClick={closeModal}>Cancelar</Button>
                        <Button variant="contained" sx={{height:30}} color="primary" onClick={submitForm}>Guardar</Button>
                    </Grid>      
                </Grid>                
            </Modal>
        )
}