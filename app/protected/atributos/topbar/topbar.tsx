import { FaSignOutAlt } from "react-icons/fa";
import { auth, signOut  } from 'app/auth';
import { getUsuario } from "@/app/schema";

export const TopBar = async () => {
  const currentDat = new Date();
//  Fecha completa separada por / slash
//  const currentDate = currentDat.toLocaleDateString("en-US");

  const day = currentDat.getDate();
// Mes con numerito
//   const month = currentDat.getMonth() + 1;
  const montName = currentDat.toLocaleString('default', { month: 'short' });
  const year = currentDat.getFullYear();

  let session = await auth();

  let correo = session?.user?.email;
  let usuarios: any[] = [];
  let nameUsuario: string | undefined;
    
  try {
    correo?.toString();
    if (correo) {
      const usuarioResponse = await getUsuario(correo);
      usuarios = usuarioResponse;
  
      if (usuarios.length > 0) {
        nameUsuario = usuarios[0].nombre; // Asignar el nivel del primer usuario a la variable
      }
    }
  
  }
  catch (error) {
    console.error(error);
  }

  return ( 
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
    <div className="flex items-center justify-between p-0.5">
      <div>
          <span className="text-sm font-bold block">🚀 BUEN DÍA, {nameUsuario} ! </span> {session?.user?.id}
        <span className="text-sm block text-stone-200">
        {day} de {montName} de {year} 
        </span>
      </div>     
        
      <SignOut />
     
    </div>
  </div>
);

};

function SignOut() {
    return (
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button className="flex text-sm items-center gap-2 text-stone-900 bg-stone-100 transition-colors hover:bg-blue-100 hover:text-stone-800 px-3 py-1.5 rounded-full" type="submit"><FaSignOutAlt /> Cerrar Sesión</button>
      </form>
    );
  }
  
