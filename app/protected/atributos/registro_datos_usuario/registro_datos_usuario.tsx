import { TopBar } from "../topbar/topbar";
import { GridRegistroDatosUsers } from "./grid_registro_usuario";

export function RegistroDatosUsuario(){
    return (
        <div className="bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridRegistroDatosUsers/>
        </div>
    )
}