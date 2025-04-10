import { TopBar } from "../topbar/topbar";
import { GridRegistroProductos } from "./grid_registro_productos";


export function RegistroProductos() {
    return (
        <div className="bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridRegistroProductos />
        </div>
    );
};
