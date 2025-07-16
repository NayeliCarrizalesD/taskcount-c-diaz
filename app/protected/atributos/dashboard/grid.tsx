import { PlaceholderActividadPagos } from "../actividad_pago/placeholder_actividad_pagos";
import Footer from "../footer";
import { getUsuario } from "@/app/schema";
import FormularioChecarEntrada from "../registro_entrada_salida/place_formulario";
import { auth } from 'app/auth';

export default async function Grid()  {
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
        <>
            <div className="px-4 grid gap-3 grid-cols-12">
            <FormularioChecarEntrada/>  
             {nivelUsuario ==='na1' ?<PlaceholderActividadPagos/>: "" }
            
            </div>
            <Footer />
        </>

    );
};
