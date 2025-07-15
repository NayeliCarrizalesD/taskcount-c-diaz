"use client";
import Footer from "../footer";
import FormularioRegistroPagoHonorarios from "./place_formulario_pagos";
import PlaceholderTablaPagosHonorarios  from "./place_tabla_registro_pagos_honorarios";

import { useEffect, useState } from "react";

export const GridRegistroPagoHonorarios = () => {
    const [datosTabla, setDatosTabla] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/clientes"); // Cambia aquí a tu API route
                const datos = await res.json();
                setDatosTabla(datos);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <FormularioRegistroPagoHonorarios />
                <PlaceholderTablaPagosHonorarios datosTabla={datosTabla} />
            </div>
            <Footer />
        </>
    );
};
