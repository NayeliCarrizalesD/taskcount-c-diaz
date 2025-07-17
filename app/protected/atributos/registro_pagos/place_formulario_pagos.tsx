
import { FormRegistroPagoCliente } from "@/app/formularios/formRegistroPago";
import { SubmitButton } from "@/app/submit-button";
import { AiOutlineTag } from "react-icons/ai";
import { createRegistroPagoHonorarios } from "./funcion_registro_pago";
import { useRouter } from "next/navigation";

export default function FormularioRegistroPagoHonorarios() { 
    const router = useRouter();

    async function handleRegistro(formData: FormData) {
        const result = await createRegistroPagoHonorarios(formData);
        if (result.message === "Registro exitoso") {
            router.push("/registro_pago_honorarios"); // Cambia por la ruta a la que quieres redirigir
        } else {
            alert(result.message);
        }
    } 
   

    return (
        <div className="lg:col-span-4 sm:col-span-12 overflow-hidden rounded-3xl bg-slate-800 shadow-xl h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    <AiOutlineTag />
                    Pago Honorarios 
                </h3>
                <h3 className="font-normal">
                    Registrar un pago de honorarios a un cliente de años pasados
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
                <FormRegistroPagoCliente action={handleRegistro}>
                    <SubmitButton>Registrar</SubmitButton>
                </FormRegistroPagoCliente>
                
            </div>
        </div>
    );
}