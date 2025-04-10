import { FormDatosUsuario } from "@/app/formDatosUsuario";
import { SubmitButton } from "@/app/submit-button";
import { createDatosUsuario, getDatosUsuario } from "@/app/schema";
import { FiUser } from "react-icons/fi";
import { redirect } from "next/navigation";

export default function FormularioDatosUsuario() {
  async function datosUsuario(formData: FormData) {
    'use server';
    let nombre = formData.get('nombre') as string;
    let apellido = formData.get('apellido') as string;
    let correo = formData.get('correo') as string;
    let nivel = formData.get('nivel') as string;
    let usuario = await getDatosUsuario(correo);

    if (usuario.length > 0) {
      return console.log('Usuario ya existe');  
    }
    else {
        await createDatosUsuario(nombre, apellido, correo, nivel);
        redirect('/ProtectedRegistroDatosUsuarios');
    }
    }
    return (
        <div className="lg:col-span-4 sm:col-span-12 rounded-3xl bg-zinc-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    <FiUser />
                    Usuarios
                </h3>
                <h3 className="font-normal">
                    Registrar un usuario
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
                <FormDatosUsuario action={datosUsuario}>
                    <SubmitButton>Registrar</SubmitButton>
                </FormDatosUsuario>
            </div>
        </div>
    );
}