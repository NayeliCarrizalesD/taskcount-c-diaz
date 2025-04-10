import { TopBar } from "../topbar/topbar";
import { GridCatalogoClientes } from "./grid_catalogo_clientes";


export function Catalogo_Clientes() {
    return (
        <div className="bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridCatalogoClientes />
        </div>
    );
};
