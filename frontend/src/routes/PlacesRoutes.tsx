import {Navigate, Route, Routes} from "react-router-dom"
import { PlacesPage } from "../places/PlacesPage";

export const PlacesRoutes = () => {
    
    return (
        <Routes>
            <Route path={"/"} element={<PlacesPage/>} />
            <Route path={"/*"} element={<Navigate to={'/places'}/> } />

        </Routes>
    );
};
