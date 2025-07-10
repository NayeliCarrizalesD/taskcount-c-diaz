"use client";
import { useEffect, useState } from 'react';

export const SelectClienteOnChange = () => {
  const  [clienteNombre, setClienteNombre] = useState<any[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("/api/clientes");
        const data = await res.json();
        setClienteNombre(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClientes();
  }, []);

   function selecionarCliente(e: React.ChangeEvent<HTMLSelectElement>) {
  const selectedCliente = e.target.value;
  console.log("Cliente seleccionado:", selectedCliente);
}


    return ( 
      <select
      id="nombre_cliente"
      name="nombre_cliente"
      onChange={selecionarCliente}
      required
      className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
          <option value={""}>Seleccione una opción</option>
          {clienteNombre.map((cliente: any) => (
          <option key={cliente.nombre_cliente} value={cliente.nombre_cliente}>{cliente.nombre_cliente}</option>   
      ))}
      </select>   
    );
  };


