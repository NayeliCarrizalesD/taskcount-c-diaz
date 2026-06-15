import { TopBar } from "../topbar/topbar";
import { GridRegistroPagoHonorarios } from "./grid_registro_pago_honorarios";


export function RegistroPagoHOnorarios(){
    return (
        <div className="main-content-card">
            <TopBar/>
            <GridRegistroPagoHonorarios/>
        </div>
    )
}