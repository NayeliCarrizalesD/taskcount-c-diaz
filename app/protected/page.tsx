import { auth } from 'app/auth';
import { Dashboard } from './atributos/dashboard/dashboard';
import { SideBarAdmin } from './atributos/sidebar/sidebar_admin/sidebar';
import { getUsuario} from '../schema';
import { SideBarN1 } from './atributos/sidebar/sidebar_nivel1/sidebar_n1';
import { SideBarN2 } from './atributos/sidebar/sidebar_nivel2/sidebar_n2';
import { SideBarN3 } from './atributos/sidebar/sidebar_nivel3/sidebar_n3';


export default async function ProtectedPage() {
  let session = await auth();
  let correo = session?.user?.email;
  let usuarios: any[] = [];
  let nivelUsuario: string | undefined;
  
  try {
    correo?.toString();
    if (correo) {
      const usuarioResponse = await getUsuario(correo);
      usuarios = usuarioResponse;

      if (usuarios.length > 0) {
        nivelUsuario = usuarios[0].nivel; // Asignar el nivel del primer usuario a la variable
      }
    }
  }
  catch (error) {
    console.error(error);
  }

  return (
    <main className="grid bg-black text-white gap-4 p-4 grid-cols-[220px,_1fr]">
    {nivelUsuario ==='na1' ?<SideBarAdmin/>: "" }
    {nivelUsuario ==='n1' ?<SideBarN1/>: "" }
    {nivelUsuario ==='n2' ?<SideBarN2/>: "" }
    {nivelUsuario ==='n3' ?<SideBarN3/>: "" }

    <Dashboard />
    

  </main> 
  );
}

/*
{usuarios.map((usuario) => (
          <p key={usuario.id}>Nivel: {usuario.nivel}</p>
        ))}

//mapeo de la informacion de usuarios
        {usuarios.map((usuario) => (
          <div key={usuario.id}>
            <p>ID: {usuario.id}</p>
            <p>Nombre: {usuario.nombre}</p>
            <p>Apellido: {usuario.apellido}</p>
            <p>Nivel: {usuario.nivel}</p>
            <p>Correo: {usuario.correo}</p>
          </div>
        ))}


    <SignOut />
function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}*/
