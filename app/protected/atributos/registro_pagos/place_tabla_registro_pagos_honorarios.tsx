"use client";
import { SelectClienteOnChange } from "../selectClienteFuncion";
//import TablaPagosHonorarios from "./tabla_registro_pago";

import { useState } from 'react';

export default function PlaceholderTablaPagosHonorarios({ datosTabla }: {datosTabla: any[]}) {
    const [clienteSeleccionado, setClienteSeleccionado] = useState<string>("");

    return (
        <div className="lg:col-span-8 sm:col-span-12 overflow-hidden rounded-3xl bg-zinc-800 shadow-xl h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    Pagos Honorarios
                </h3>
                <h3 className="font-normal">
                    Ver los pagos que se han realizado de los clientes por honorarios
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
                <SelectClienteOnChange 
                  clienteSeleccionado={clienteSeleccionado}
                  setClienteSeleccionado={setClienteSeleccionado}
                />
                {/*<TablaPagosHonorarios
                  clienteSeleccionado={clienteSeleccionado}
                  datosTabla={datosTabla} 
                />*/}
            </div>
        </div>
    )
}