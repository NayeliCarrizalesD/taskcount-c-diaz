
import { TopBar } from "../topbar/topbar";
import { GridInventario } from "./grid_inventario";



export function Inventario() {
    return (
        <div className="p-4 sm:ml-64 m-3 bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridInventario />
        </div>
    );
};
