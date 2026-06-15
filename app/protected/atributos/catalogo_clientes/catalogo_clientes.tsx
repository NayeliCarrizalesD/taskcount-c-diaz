import { TopBar } from "../topbar/topbar";
import { GridCatalogoClientes } from "./grid_catalogo_clientes";


export function Catalogo_Clientes() {
    return (
        <div className="main-content-card">
            <TopBar/>
            <GridCatalogoClientes />
        </div>
    );
};
