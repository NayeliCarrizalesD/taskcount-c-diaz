"use client";
import { useEffect, useState } from 'react';

export const SelectClienteOnChange = ({
  clienteSeleccionado,
  setClienteSeleccionado,
}: {
  clienteSeleccionado: string;
  setClienteSeleccionado: (cliente: string) => void;
}) => {
  const [clienteNombre, setClienteNombre] = useState<any[]>([]);

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
    setClienteSeleccionado(e.target.value);
    console.log("Cliente seleccionado:", e.target.value);
  }



    return ( 
      <select
      id="id_cliente"
      name="id_cliente"
      value={clienteSeleccionado}
      onChange={selecionarCliente}
      required
      className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-gray-600 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
      >
          <option value={""}>Seleccione una opción</option>
          {clienteNombre.map((cliente: any) => (
            <option key={cliente.id_cliente} value={cliente.id_cliente}>
              {cliente.nombre_cliente}{cliente.estado === 'baja' ? ' (Baja)' : ''}
            </option>   
          ))}
      </select>   
    );
  };


