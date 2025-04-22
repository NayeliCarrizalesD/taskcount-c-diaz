import { auth } from 'app/auth';
import { getEntradaSalida } from '@/app/schema';

export const InputChecadorUsuario = async () => {
  let session = await auth();
  let correo = session?.user?.email;

  let usuarios: any[] = [];
  let checador: string | undefined;

  const inputValue  = document.getElementById('checador') as HTMLInputElement;
  if (inputValue) {
    inputValue.value = 'Entrada';
  } else {

  try {
      correo?.toString();
      if (correo) {
        const usuarioResponse = await getEntradaSalida(correo);
        usuarios = usuarioResponse;
    
        if (usuarios.length > 0) {
            checador = usuarios[0].checador; // Asignar el nivel del primer usuario a la variable
            
        }
      }
    
    }
    catch (error) {
      console.error(error);
    }
}

  
  return ( 

    <input
    id="checador"
    name="checador"
    value={checador}
    required
    readOnly
    type="text"
    className="mt-1 block w-full text-black rounded-full border border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
/>
   
);

};


