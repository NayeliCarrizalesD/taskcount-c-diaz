import { TopBar } from "../topbar/topbar";
import { GridRegistroDatosUsers } from "./grid_registro_usuario";

export function RegistroDatosUsuario(){
    return (
        <div className="main-content-card">
            <TopBar/>
            <GridRegistroDatosUsers/>
        </div>
    )
}