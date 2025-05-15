import { TopBar } from "../topbar/topbar";
import { GridRegistroProductos } from "./grid_registro_productos";


export function RegistroProductos() {
    return (
        <div className="p-4 sm:ml-64 m-3 bg-zinc-800 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridRegistroProductos />
        </div>
    );
};
