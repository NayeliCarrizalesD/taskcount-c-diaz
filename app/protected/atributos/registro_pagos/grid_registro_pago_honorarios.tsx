"use client";
import Footer from "../footer";
import FormularioRegistroPagoHonorarios from "./place_formulario_pagos";
import PlaceholderTablaPagosHonorarios  from "./place_tabla_registro_pagos_honorarios";
import { useEffect, useState } from "react";

export const GridRegistroPagoHonorarios = () => {
    const [datosTabla, setDatosTabla] = useState<any[]>([]);

    /*const fetchData = async () => {
        try {
            const res = await fetch("/api/clientes-nombres");
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const datos = await res.json();
            setDatosTabla(datos);
        } catch (error) {
            console.error('Error fetching data:', error);
            setDatosTabla([]); // Set empty array as fallback
        }
    };*/

    const fetchDatos = async () => {
  const res = await fetch("/api/pagos-honorarios");
  const data = await res.json();
  setDatosTabla(data);
};

    useEffect(() => {
        fetchDatos();
    }, []);

    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <FormularioRegistroPagoHonorarios onPagoRegistrado={fetchDatos} />
                <PlaceholderTablaPagosHonorarios datosTabla={datosTabla} />
            </div>
            <Footer />
        </>
    );
};

              /*  if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const datos = await res.json();
                setDatosTabla(datos);
            } catch (error) {
                console.error('Error fetching data:', error);
                setDatosTabla([]); // Set empty array as fallback
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
};*/
