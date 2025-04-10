import { FormRegistroCliente } from "@/app/formRegistroCliente";
import { createNewClient, getClientes } from "@/app/schema";
import { SubmitButton } from "@/app/submit-button";
import { redirect } from "next/navigation";
import { FiFolder } from "react-icons/fi";

export default function FormularioClientes() {
  
    async function RegistroCatalogoCliente(formData: FormData) {
        'use server';
        
        let marca_temporal = formData.get('marca_temporal') as string;
        let nombre_cliente = formData.get('nombre_cliente') as string;
        let telefono_cliente = formData.get('telefono_cliente') as string;
        let correo_cliente = formData.get('correo_cliente') as string;
        let rfc = formData.get('rfc') as string;
        let correo_empleado = formData.get('correo_empleado') as string;

        let cliente = await getClientes(nombre_cliente.toString());
    
        if (cliente.length > 0) {
            return console.log('El cliente ya existe');              
        } else {
            await createNewClient(marca_temporal, nombre_cliente, telefono_cliente, correo_cliente, rfc, correo_empleado);
            redirect('/protected/catalogo_clientes'); // Redirigir a la página de registro de productos
        }             
    }

    return (
        <div className="lg:col-span-6 sm:col-span-12 rounded-3xl bg-zinc-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    <FiFolder />
                    Clientes
                </h3>
                <h3 className="font-normal">
                    Registrar un Cliente
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
                <FormRegistroCliente action={RegistroCatalogoCliente}>
                    <SubmitButton>Registrar Cliente </SubmitButton>
                </FormRegistroCliente>
                
            </div>
        </div>
    );
}