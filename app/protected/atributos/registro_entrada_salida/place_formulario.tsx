
//import { insertCostoFlete } from "@/app/action";
import { FormCheckHora } from "@/app/formCheckHoras";
import { createNewEntradaSalida, getEntradaSalida } from "@/app/schema";
import { SubmitButtonFlete } from "@/app/submit_button_flete";
import { redirect } from "next/navigation";
import { FiFolder } from "react-icons/fi";
import { TextoInputChecadorUsuario } from "../inputChecador";


export default function FormularioChecarEntrada() {
  
    async function EntradaSalida(formData: FormData) {
        'use server';
        let fecha_entrada_salida = formData.get('fecha_entrada_salida') as string;
        let hora_entrada_salida = formData.get('hora_entrada_salida') as string;
        let checador = formData.get('checador') as string;
        let nombre_empleado = formData.get('nombre_empleado') as string;
        let correo_empleado = formData.get('correo_empleado') as string;
        let idEntrada = await getEntradaSalida(hora_entrada_salida);
    
        if (idEntrada.length > 0) {
            return console.log('ya existe');              
                // TODO: Handle errors with useFormStatus - return 'Costo ya existe';
        } else {
            await createNewEntradaSalida(fecha_entrada_salida, hora_entrada_salida, checador, nombre_empleado, correo_empleado);
            redirect('/ProtectedConsultaFlete');
        }             
    }

    return (
        <div className="lg:col-span-4 sm:col-span-12 rounded-3xl bg-zinc-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    <FiFolder />
                    Checador
                </h3>
                <h3 className="font-normal">
                    Registrar Entrada / Salida <TextoInputChecadorUsuario/>
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
                <FormCheckHora action={EntradaSalida}>
                    <SubmitButtonFlete>Checar</SubmitButtonFlete>
                </FormCheckHora>
            </div>
        </div>
    );
}