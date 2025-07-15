"use server"
import { createDatosUsuario, getUsuario } from "@/app/schema";
import { redirect } from "next/navigation";

export async function createRegistroPagoHonorarios(formData: FormData) {

    let fecha_alta = formData.get('fecha_alta') as unknown as string;
    let telefono_usuario = formData.get('telefono_usuario') as string;
    let correo = formData.get('correo') as string;
    let nivel = formData.get('nivel') as string;
    let usuario = await getUsuario(correo);

    if (usuario.length > 0) {
      return console.log('Usuario ya existe');  
    }
    else {
        await createDatosUsuario(fecha_alta, telefono_usuario, correo, nivel);
        redirect('/ProtectedRegistroDatosUsuarios');
    }
    }