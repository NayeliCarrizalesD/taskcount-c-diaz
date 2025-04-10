import { TopBar } from "../topbar/topbar";
import { GridRegistroClientes } from "./grid_registro_cliente";


export function RegistroClientes() {
    return (
        <div className="bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridRegistroClientes />
        </div>
    );
};
