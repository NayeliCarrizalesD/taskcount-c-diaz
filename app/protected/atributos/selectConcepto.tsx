"use client";
import { useEffect, useState } from "react";

export const SelectConcepto = () => {
    const [conceptos, setConceptos] = useState<any[]>([]);

    useEffect(() => {
        const fetchConceptos = async () => {
            try {
                const res = await fetch("/api/conceptos");
                const data = await res.json();
                setConceptos(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchConceptos();
    }, []);

  return ( 
    <>
    <label
            htmlFor="concepto"
            className="block text-xs uppercase"
          >
            concepto
          </label>
    <select
    id="concepto"
    name="concepto"
    required
    className="mt-1  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
        <option value={""}>Seleccione una opción</option>
        {conceptos.map((cliente: any) => (
        <option key={cliente.nombre_producto_servicio} value={cliente.nombre_producto_servicio}>{cliente.nombre_producto_servicio}</option>   
    ))}
    </select>
    </>   
  );
};





