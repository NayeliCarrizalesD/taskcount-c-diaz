import Footer from "../footer";
import FormularioRegistroPagoHonorarios from "./place_formulario_pagos";



export const GridRegistroPagoHonorarios = () => {
    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <FormularioRegistroPagoHonorarios />
        
            </div>
            <Footer />
        </>

    );
};
