"use client";
import { useEffect, useState } from "react";
import { BtnEditar } from "../BtnEditar";
import Swal from "sweetalert2";
import { BtnPagar } from "../BtnPagar";
import { BtnVerHistorialDePago } from "../BtnVerHistorialDePago";

export default function TablaClientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/clientes");
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error('La respuesta no es JSON válido');
        }
        
        const data = await response.json();
        setClientes(Array.isArray(data) ? data : []);
        
      } catch (error) {
        console.error('Error al cargar clientes:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleUpdateCliente = async (clienteData: any) => {
  try {
    console.log('Sending update request for client:', clienteData);
    
    const response = await fetch(`/api/updateCliente/${clienteData.id_cliente}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre_cliente: clienteData.nombre_cliente,
        telefono_cliente: clienteData.telefono_cliente,
        correo_cliente: clienteData.correo_cliente,
        rfc: clienteData.rfc
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.details || errorMessage;
        console.error('Error response:', errorData);
      } catch (parseError) {
        console.error('Could not parse error response:', parseError);
        const textResponse = await response.text();
        console.error('Raw error response:', textResponse);
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Update successful:', result);
    
    // Actualizar el estado local
    setClientes(prevClientes =>
      prevClientes.map(cliente =>
        cliente.id_cliente === clienteData.id_cliente
          ? { ...cliente, ...clienteData }
          : cliente
      )
    );

    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Cliente actualizado correctamente',
      timer: 2000,
      showConfirmButton: false
    });

  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error instanceof Error ? error.message : 'Error de conexión'
    });
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">Cargando clientes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full overflow-scroll rounded-lg bg-clip-border bg-zinc-900 my-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-neutral-800 table-auto min-w-max">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>ID</th>
              <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Nombre</th>
              <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Correo</th>
              <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={cliente.id_cliente} className={index % 2 ? "bg-stone-700 text-sm hover:bg-black hover:text-white border-b border-neutral-500" : "text-sm hover:bg-black hover:text-white border-b border-neutral-500"}>
                <td className="p-4">{cliente.id_cliente}</td>
                <td className="p-4">{cliente.nombre_cliente}</td>
                <td className="p-4">{cliente.correo_cliente}</td>
                <td className="p-4">
                  <BtnEditar onClick={handleUpdateCliente} cliente={cliente} />
                  <BtnPagar cliente={cliente} />
                  <BtnVerHistorialDePago cliente={cliente} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="flex items-center my-3 mx-2 flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
              <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
