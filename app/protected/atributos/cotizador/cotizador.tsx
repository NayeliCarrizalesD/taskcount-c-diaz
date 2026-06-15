import { TopBar } from "../topbar/topbar";
import { GridCotizador } from "./grid_cotizador";

export function Cotizador() {
    return(
        <div className="main-content-card">
            <TopBar/>
            <GridCotizador/>    
        </div>

    );
}