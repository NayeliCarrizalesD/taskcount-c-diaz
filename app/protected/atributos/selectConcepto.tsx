"use client";
import { useEffect, useState } from "react";

export function SelectConcepto({ id, name }: { id: string, name: string }) {
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
        
        <select
            id={id} 
            name={name}
            required
            className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
            >
            <option value={""}>Seleccione una opción</option>
            {conceptos.map((cliente: any) => (
                <option key={cliente.nombre_producto_servicio} value={cliente.nombre_producto_servicio}>{cliente.nombre_producto_servicio}</option>   
            ))}
        </select>
    </>   
  );
};





