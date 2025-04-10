
import { TopBar } from "../topbar/topbar";
import { GridTablaFullCostoFlete } from "./grid_tabla_costoFlete";



export function ConsultaFletes() {
    return (
        <div className="bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridTablaFullCostoFlete />
        </div>
    );
};
