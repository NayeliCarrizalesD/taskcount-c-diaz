"use client";
import { useEffect, useState } from "react";

export function SelectNombreClienteTodos({ id, name }: { id: string, name: string }) {
  const [clientes, setClientes] = useState<any[]>([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const res = await fetch("/api/clientes");
                const data = await res.json();
                setClientes(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchClientes();
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
          {clientes.map((cliente: any) => (
            <option key={cliente.id_cliente} value={cliente.id_cliente}>
              {cliente.nombre_cliente}{cliente.estado === 'baja' ? ' (Baja)' : ''}
            </option>   
          ))}
      </select>   
      </>
    );
  };





