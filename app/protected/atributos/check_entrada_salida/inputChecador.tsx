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
        className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
    />
    </>
  );
};

// Este componente se usa para mostrar solo el TEXTO del checador, sin el input
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


