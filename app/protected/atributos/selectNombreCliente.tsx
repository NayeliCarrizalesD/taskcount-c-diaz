
import {  getTodosClientes } from '@/app/schema';

export const SelectNombreClienteTodos = async () => {
  let clienteNombre: any[] = [];
  
    try {
      clienteNombre = await getTodosClientes();      
      }
      catch (error) {
        console.error(error);
      }
    return ( 
      <select
      id="nombre_cliente"
      name="nombre_cliente"
      required
      className="px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
          <option value={""}>Seleccione una opción</option>
          {clienteNombre.map((cliente: any) => (
          <option key={cliente.nombre_cliente} value={cliente.nombre_cliente}>{cliente.nombre_cliente}</option>   
      ))}
      </select>   
    );
  };





