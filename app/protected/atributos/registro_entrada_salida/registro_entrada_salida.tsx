import { TopBar } from "../topbar/topbar";
import { GridRegistroChecador } from "./grid_registro_entrada_salida";

export function RegistroEntradaSalida() {
    return (
        <div className="bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridRegistroChecador />
        </div>
    );
};
