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
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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


