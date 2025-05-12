import { auth } from 'app/auth';
import { getUsuario } from "@/app/schema";

export const AccountAdminToggle = async () => {
    let session = await auth();
    let correo = session?.user?.email;
    
    let nameUsuario  = session?.user?.name;
    
    /*let nameUsuario: string | undefined;
    let usuarios: any[] = [];
    try {
      correo?.toString();
      if (correo) {
        const usuarioResponse = await getUsuario(correo);
        usuarios = usuarioResponse;
  
        if (usuarios.length > 0) {
          nameUsuario = usuarios[0].name; // Asignar el nivel del primer usuario a la variable
        }
      }
  
    }
    catch (error) {
      console.error(error);
    }*/
    return (
        <>
       
            
              <div className="flex items-center p-2 text-gray-900 rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="text-sm font-bold block">
                      {nameUsuario} 
                  </span> 
              </div>    
              <div className="flex items-center p-2 text-gray-900 rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  
                  <span className="text-xs block py-1">
                      {correo}
                  </span>
              </div>         
    
    </>

    );
}
// <div className="border-b mb-4 mt-2 pb-4 border-stone-200"> </div> 
//<img src="https://api.dicebear.com/9.x/notionists/svg" alt="avatar" className="size-8 rounded-full shrink-0 bg-sky-700 shadow"/>