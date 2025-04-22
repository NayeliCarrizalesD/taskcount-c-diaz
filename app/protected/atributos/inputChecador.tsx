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
    
        if (lastCheck.length > 0) {
            checador = lastCheck[0].checador; // Asignar el nivel del primer usuario a la variable
             // Asignar el nivel del primer usuario a la variable
        }
        if (checador === "Entrada") {
            checador = "Salida";
          }
          console.log({checador})
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
{checador}
</>
   
);

};


