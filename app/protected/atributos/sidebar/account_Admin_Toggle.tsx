import { auth } from 'app/auth';
import { getUsuario } from "@/app/schema";

export const AccountAdminToggle = async () => {
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
        <>
        <div className="border-b mb-4 mt-2 pb-4 border-stone-200">
            <button className="flex p-0.5 hover:bg-stone-600 rounded-full transition-colors relative gap-2 w-full item-center">
        
                <div className="text-center px-2">
                    <span className="text-sm font-bold block">
                        {nameUsuario} 
                    </span> 
                    
                    <span className="text-xs block py-1">
                        {session?.user?.email}
                    </span>
                </div>         
            </button> 
        </div>  
    </>

    );
}

//<img src="https://api.dicebear.com/9.x/notionists/svg" alt="avatar" className="size-8 rounded-full shrink-0 bg-sky-700 shadow"/>