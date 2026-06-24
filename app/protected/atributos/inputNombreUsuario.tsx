import { auth } from 'app/auth';
import { getUser } from "@/app/db";

export const InputNombreUsuario = async () => {
  let session = await auth();
  let correo = session?.user?.email;
  //const nombre= session?.user?.name;
  let usuarios: any[] = [];
  let lastNameUsuario: string | undefined;
  let nameUser: string | undefined;

  try {
      correo?.toString();
      if (correo) {
        const usuarioResponse = await getUser(correo);
        usuarios = usuarioResponse;
    
        if (usuarios.length > 0) {
            nameUser = usuarios[0].name; // Asignar el nivel del primer usuario a la variable
            lastNameUsuario = usuarios[0].last_name; // Asignar el nivel del primer usuario a la variable
        }
      }
    
    }
    catch (error) {
      console.error(error);
    }

  let nombreCompleto = `${nameUser} ${lastNameUsuario}`;
  
  return ( 

    <input
    id="nombre_empleado"
    name="nombre_empleado"
    value={nombreCompleto}
    required
    readOnly
    type="text"
    className="w-full mt-1 px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm placeholder-gray-400"
    />   
  );
};



export const TextoInputNombreUsuario = async () => {
  let session = await auth();
  let correo = session?.user?.email;
  let usuarios: any[] = [];
  let lastNameUsuario: string | undefined;
  let nameUser: string | undefined;

  try {
      correo?.toString();
      if (correo) {
        const usuarioResponse = await getUser(correo);
        usuarios = usuarioResponse;
    
        if (usuarios.length > 0) {
            nameUser = usuarios[0].name; // Asignar el nivel del primer usuario a la variable
            lastNameUsuario = usuarios[0].last_name; // Asignar el nivel del primer usuario a la variable
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  let nombreCompleto = `${nameUser} ${lastNameUsuario}`;
  
  return (
    <>
    {nombreCompleto}
    </> 
  );
};


