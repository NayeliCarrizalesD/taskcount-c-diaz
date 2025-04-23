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
            } else if (checador === null) {
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
    value={checador}
    required
    //defaultValue="Entrada"
    readOnly
    type="text"
    className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
/>
</>
   
);

};


