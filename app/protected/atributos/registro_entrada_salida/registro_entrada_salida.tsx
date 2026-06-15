import { TopBar } from "../topbar/topbar";
import { GridRegistroChecador } from "./grid_registro_entrada_salida";

export function RegistroEntradaSalida() {
    return (
        <div className="main-content-card">
            <TopBar/>
            <GridRegistroChecador />
        </div>
    );
};
