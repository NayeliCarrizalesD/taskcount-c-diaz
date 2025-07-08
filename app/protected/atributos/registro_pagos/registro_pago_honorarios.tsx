import { TopBar } from "../topbar/topbar";
import { GridRegistroPagoHonorarios } from "./grid_registro_pago_honorarios";


export function RegistroPagoHOnorarios(){
    return (
        <div className="p-4 sm:ml-64 m-3 bg-zinc-700 rounded-3xl pb-4 shadow h-auto">
            <TopBar/>
            <GridRegistroPagoHonorarios/>
        </div>
    )
}