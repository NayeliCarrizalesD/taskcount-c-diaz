import { auth } from 'app/auth';
import { getClienteHonorariosTodos, getLastEntradaSalida } from '@/app/schema';

export const InfoClientePago = async () => {

   let clienteNombre: any[] = [];
      
   try {
       clienteNombre = await getClienteHonorariosTodos();      
      }
      catch (error) {
      console.error(error);
    }

    

let nombreCliente: string | undefined = undefined;


  let lastCheck: any = null;
  let cliente: string | undefined;

  try {
      if (nombreCliente) {
        const usuarioCheck = await getLastEntradaSalida(nombreCliente);
        lastCheck = usuarioCheck;

        if (lastCheck) {
            cliente = lastCheck.checador; // Asignar el nivel del usuario a la variable
            if (cliente === "Entrada") {
                cliente = "Salida";
            } else if (cliente === "Salida") {
                cliente = "Entrada";
            } else {
                cliente = "Entrada"; // Valor por defecto si no es ni Entrada ni Salida
            }
        }
      }
    
    }
    catch (error) {
      console.error(error);
    }

  
  return ( 
    <>

    <select
          id="nombre_cliente"
          name="nombre_cliente"
          required
          className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
              <option value={""}>Seleccione una opción</option>
              {clienteNombre.map((cliente: any) => (
              <option key={cliente.nombre_cliente} value={cliente.nombre_cliente}>{cliente.nombre_cliente}</option>   
          ))}
          </select>   
        <input 
        id="checador"
        name="checador"
        required
        defaultValue="Entrada"
        value={cliente}
        readOnly
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
    </>
  );
};

export const TextoInputChecadorUsuario = async () => {
  let session = await auth();
  let correo = session?.user?.email;

  let lastCheck: any = null;
  let checador: string | undefined;

  try {
      correo?.toString();
      if (correo) {
        const usuarioCheck = await getLastEntradaSalida(correo);
        lastCheck = usuarioCheck;

        if (lastCheck) {
            checador = lastCheck.checador; // Asignar el nivel del usuario a la variable
            if (checador === "Entrada") {
                checador = "Salida";
            } else if (checador === "Salida") {
                checador = "Entrada";
            } else {
                checador = "Entrada"; // Valor por defecto si no es ni Entrada ni Salida
            }
        }
      }
    
    }
    catch (error) {
      console.error(error);
    }

  
  return ( 
    <>
       {checador}

    </>
  );
};


