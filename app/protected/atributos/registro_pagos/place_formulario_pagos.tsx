
import { FormRegistroPagoCliente } from "@/app/formularios/formRegistroPago";
import { createRegistroPago, getRegistroPago } from "@/app/schema";
import { SubmitButton } from "@/app/submit-button";
import { redirect } from "next/navigation";
import { AiOutlineTag } from "react-icons/ai";


export default function FormularioRegistroPagoHonorarios() {  
    async function createRegistroPagoHonorarios(formData: FormData) {
        'use server';
        
        let nombre_cliente = formData.get('nombre_cliente') as string;
        let concepto = formData.get('concepto') as string;
        let pagoStr = formData.get('pago') as string;
        let pago = Number(pagoStr);
        let mes_pago = formData.get('mes_pago') as string;
        let marca_temporal  = formData.get('marca_temporal') as string;
        let correo_empleado = formData.get('correo_empleado') as string;

    let producto = await getRegistroPago(nombre_cliente.toString());

    if (producto.length > 0) {
        return console.log('La configuracion ya existe');              
    } else {
        await createRegistroPago(nombre_cliente, concepto, pago, mes_pago, marca_temporal, correo_empleado);
        redirect('/protected/config_clientes_honorarios'); // Redirigir a la página de registro de productos
    }             
    }

    return (
        <div className="lg:col-span-4 sm:col-span-12 overflow-hidden rounded-3xl bg-slate-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    <AiOutlineTag />
                    PAgo honorarios 
                </h3>
                <h3 className="font-normal">
                    Registrar un concepto en el catalogo de productos y servicios
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
                <FormRegistroPagoCliente action={createRegistroPagoHonorarios}>
                    <SubmitButton>Registrar</SubmitButton>
                </FormRegistroPagoCliente>
                
            </div>
        </div>
    );
}