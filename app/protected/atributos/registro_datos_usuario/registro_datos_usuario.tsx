import { TopBar } from "../topbar/topbar";
import { GridRegistroDatosUsers } from "./grid_registro_usuario";

export function RegistroDatosUsuario(){
    return (
        <div className="p-4 sm:ml-64 m-3 bg-zinc-800 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridRegistroDatosUsers/>
        </div>
    )
}