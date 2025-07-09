import Footer from "../footer";
import FormularioRegistroPagoHonorarios from "./place_formulario_pagos";
import { PlaceholderTablaPagosHonorarios } from "./place_tabla_registro_pagos_honorarios";



export const GridRegistroPagoHonorarios = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <FormularioRegistroPagoHonorarios />
                <PlaceholderTablaPagosHonorarios />
        
            </div>
            <Footer />
        </>

    );
};
