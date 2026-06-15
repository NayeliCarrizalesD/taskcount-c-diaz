import { TopBar } from "../topbar/topbar";
import { GridRegistroProductos } from "./grid_registro_productos";


export function RegistroProductos() {
    return (
        <div className="main-content-card">
            <TopBar/>
            <GridRegistroProductos />
        </div>
    );
};
