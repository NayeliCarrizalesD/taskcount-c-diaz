import { auth } from 'app/auth';
import { getUser } from "@/app/db";

export const InputNombreUsuario = async () => {
  let session = await auth();
  let correo = session?.user?.email;
  const nombre= session?.user?.name;
  let usuarios: any[] = [];
  let lastNameUsuario: string | undefined;

  try {
      correo?.toString();
      if (correo) {
        const usuarioResponse = await getUser(correo);
        usuarios = usuarioResponse;
    
        if (usuarios.length > 0) {
            lastNameUsuario = usuarios[0].last_name; // Asignar el nivel del primer usuario a la variable
        }
      }
    
    }
    catch (error) {
      console.error(error);
    }

  let nombreCompleto = `${nombre} ${lastNameUsuario}`;
  
  return ( 

    <input
    id="nombre_empleado"
    name="nombre_empleado"
    value={nombreCompleto}
    required
    readOnly
    type="text"
    className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
/>
   
);

};


