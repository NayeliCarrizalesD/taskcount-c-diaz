import { TopBar } from "../topbar/topbar";
import { GridCotizador } from "./grid_cotizador";

export function Cotizador() {
    return(
        <div className="p-4 sm:ml-64 m-3 bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridCotizador/>    
        </div>

    );
}