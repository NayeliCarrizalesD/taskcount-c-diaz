import { TopBar } from "../topbar/topbar";
import { GridCatalogoProductos } from "./grid_catalogo_productos";


export function Catalogo_Productos() {
    return (
        <div className="bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridCatalogoProductos />
        </div>
    );
};
