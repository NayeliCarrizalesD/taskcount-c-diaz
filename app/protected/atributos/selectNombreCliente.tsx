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
      className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
          <option value={""}>Seleccione una opción</option>
          {clientes.map((cliente: any) => (
          <option key={cliente.id_cliente} value={cliente.id_cliente}>{cliente.id_cliente}</option>   
      ))}
      </select>   
      </>
    );
  };





