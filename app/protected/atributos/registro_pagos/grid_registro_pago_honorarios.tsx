"use client";
import Footer from "../footer";
import FormularioRegistroPagoHonorarios from "./place_formulario_pagos";
import PlaceholderTablaPagosHonorarios  from "./place_tabla_registro_pagos_honorarios";
import { BulkUpload } from "../../components/BulkUpload";
import { useEffect, useState } from "react";

export const GridRegistroPagoHonorarios = () => {
    const [datosTabla, setDatosTabla] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/clientes-nombres");
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const datos = await res.json();
            setDatosTabla(datos);
        } catch (error) {
            console.error('Error fetching data:', error);
            setDatosTabla([]); // Set empty array as fallback
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
                <div className="lg:col-span-4 sm:col-span-12 flex flex-col gap-3">
                    <FormularioRegistroPagoHonorarios onRegistroExitoso={fetchData} />
                    <BulkUpload />
                </div>
                <PlaceholderTablaPagosHonorarios datosTabla={datosTabla} loading={loading} onRefresh={fetchData} />
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
