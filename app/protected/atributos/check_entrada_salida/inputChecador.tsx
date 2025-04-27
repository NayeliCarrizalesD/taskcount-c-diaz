import { auth } from 'app/auth';
import { getLastEntradaSalida } from '@/app/schema';

export const InputChecadorUsuario = async () => {
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
        <input
        id="checador"
        name="checador"
        required
        defaultValue="Entrada"
        value={checador}
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


