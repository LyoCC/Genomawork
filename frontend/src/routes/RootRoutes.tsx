import { Route, Routes} from "react-router-dom"
import { PlacesRoutes } from "./PlacesRoutes";

export const RootRoutes = () => {
    
    return (
        <Routes>
            <Route path={'/*'} element={<PlacesRoutes/> } />
        </Routes>
    );
};
