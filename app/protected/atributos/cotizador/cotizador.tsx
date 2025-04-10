import { TopBar } from "../topbar/topbar";
import { GridCotizador } from "./grid_cotizador";

export function Cotizador() {
    return(
        <div className="bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridCotizador/>    
        </div>

    );
}