import { TopBar } from "../topbar/topbar";
import { GridRegistroClientes } from "./grid_registro_cliente";


export function RegistroClientes() {
    return (
        <div className="main-content-card">
            <TopBar/>
            <GridRegistroClientes />
        </div>
    );
};
