import { TopBar } from "../topbar/topbar";
import { GridCatalogoProductos } from "./grid_catalogo_productos";


export function Catalogo_Productos() {
    return (
        <div className="p-4 sm:ml-64 m-3 bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridCatalogoProductos />
        </div>
    );
};
