import {CircularProgress, Grid} from "@mui/material";

export const Loading = () => {
    return (
        <Grid
            container
            spacing={0}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{minHeight: '100vh',top:0, left:0, backgroundColor: '#f175a5', padding: 4, position: 'absolute', zIndex: 999, opacity: 0.4}}
        >
            <Grid container
                  direction={'row'}
                  justifyContent={'center'}
            >
                <CircularProgress color={"primary"}/>
            </Grid>
        </Grid>
    );
};
