
import FormRegistroPagoCliente from "@/app/formularios/formRegistroPago";
import { SubmitButton } from "@/app/submit-button";
import { AiOutlineTag } from "react-icons/ai";
import { createRegistroPagoHonorarios } from "./funcion_registro_pago";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function FormularioRegistroPagoHonorarios({ onRegistroExitoso }: { onRegistroExitoso?: () => void }) { 
    const router = useRouter();

    async function handleRegistro(formData: FormData) {
        try {
            const result = await createRegistroPagoHonorarios(formData);
            if (result.message === "Registro exitoso") {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Pago registrado correctamente',
                    timer: 2000,
                    showConfirmButton: false,
                    color: "white",
                    background: "black",
                    customClass: {
                        popup: 'border-radius-0'
                    }
                });

                // Reset the form
                const form = document.getElementById('registro-pago-form') as HTMLFormElement;
                if (form) {
                    form.reset();
                }

                // Trigger reload
                if (onRegistroExitoso) {
                    onRegistroExitoso();
                } else {
                    router.push("/");
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message || 'No se pudo registrar el pago',
                    color: "white",
                    background: "black",
                    customClass: {
                        popup: 'border-radius-0'
                    }
                });
            }
        } catch (error) {
            console.error('Error al registrar pago:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error de red o del servidor al procesar el pago',
                color: "white",
                background: "black",
                customClass: {
                    popup: 'border-radius-0'
                }
            });
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