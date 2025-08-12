"use client";
import { useEffect, useState } from "react";
import { BtnEditar } from "../BtnEditar";
// Importa tu función para obtener clientes desde la API o un fetch

export default function TablaClientes() {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    // Reemplaza esto por tu fetch real, por ejemplo:
    fetch("/api/clientes")
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(e => console.error(e));
  }, []);

    // Define the handler function
    const handleUpdateCliente = async (clienteData: any) => {
        try {
            const response = await fetch(`/api/updateCliente/${clienteData.id_cliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clienteData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Cliente actualizado exitosamente:', result);

                // Actualizar el estado local para reflejar los cambios
                setClientes(prevClientes =>
                    prevClientes.map(cliente =>
                        cliente.id_cliente === clienteData.id_cliente
                            ? { ...cliente, ...clienteData }
                            : cliente
                    )
                );

                alert('Cliente actualizado exitosamente');
            } else {
                let errorMessage = 'Error al actualizar el cliente';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (jsonError) {
                    console.error('Error parsing response:', jsonError);
                }
                console.error('Error al actualizar cliente:', errorMessage);
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        }
    };

    return (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  w-full h-full overflow-scroll  rounded-lg bg-clip-border bg-zinc-900 my-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400w-full bg-neutral-800  dark:text-gray-400 table-auto min-w-max">   
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className='invisible w-0 h-0'></th>
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>RFC</th>
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Nombre / Razon Social </th>
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Telefono</th> 
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Fecha Alta</th> 
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Registrado por:</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes && clientes.map((cliente: any, index: number) => (
                        <tr className={index % 2 ? "bg-stone-700 text-sm hover:bg-black hover:text-white border-b border-neutral-500" : "text-sm hover:bg-black hover:text-white border-b border-neutral-500"} key={cliente.id_cliente}>
                            <td className="invisible w-0 h-0">{cliente.id_cliente}</td>
                            <td className="p-4">{cliente.rfc}</td>
                            <td className="p-4">{cliente.nombre_cliente}</td>
                            <td className="p-4">{cliente.telefono_cliente}</td>
                            <td className="p-4">{cliente.fecha_alta}</td>
                            <td className="p-4"><BtnEditar onClick={handleUpdateCliente} cliente={cliente} /></td>
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
    )
}
