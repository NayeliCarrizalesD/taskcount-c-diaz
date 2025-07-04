
//import { auth } from 'app/auth';
//import { getClienteHonorariosTodos, getLastEntradaSalida, getRegistroPago } from '@/app/schema';

//import React, { useState, useEffect } from 'react';

export const InfoClientePago = () => {
 /* const [clienteNombre, setClienteNombre] = useState<any[]>([]);
  const [pagoConcepto, setPagoConcepto] = useState<string>('');*/

  /*useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClienteHonorariosTodos();
        setClienteNombre(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClientes();
  }, []);*/

  async function cargarConcepto(event: React.ChangeEvent<HTMLSelectElement>) {
    //const nombre_cliente = event.target.value;
    //let conceptoPago: any = null;

    /*try {
    
        const usuarioCheck = await getRegistroPago(nombre_cliente);
        conceptoPago = usuarioCheck;
        setPagoConcepto(conceptoPago.concepto ?? '');
         
        
     
    } catch (error) {
      console.error(error);
      setPagoConcepto('');
    }

    console.log("Cargando concepto para el cliente:", nombre_cliente);*/
  }

  return (
    <>
      <div>
        <label htmlFor="rfc" className="block text-xs uppercase">
          nombre cliente
        </label>
        <select
          id="nombre_cliente"
          name="nombre_cliente"
          onChange={cargarConcepto}
          required
          className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {/*<option value={""}>Seleccione una opción</option>
          {clienteNombre.map((cliente: any) => (
            <option key={cliente.nombre_cliente} value={cliente.nombre_cliente}>{cliente.nombre_cliente}</option>
          ))}*/}
        </select>
      </div>

      <div>
        <label htmlFor="rfc" className="block text-xs uppercase">
          nombre cliente
        </label>

        <input
          id="checador"
          name="checador"
          required
          defaultValue="Entrada"
          //value={pagoConcepto}
          readOnly
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </>
  );
};

{/*export const TextoInputChecadorUsuario = async () => {
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
*/}

