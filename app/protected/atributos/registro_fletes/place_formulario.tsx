
//import { insertCostoFlete } from "@/app/action";
import { FormCostoFlete } from "@/app/formCostoFlete";
import { createCosto, getCosto } from "@/app/schema";
import { SubmitButtonFlete } from "@/app/submit_button_flete";
import { redirect } from "next/navigation";
import { FiFolder } from "react-icons/fi";


export default function FormularioCostos() {
  
    async function costoFlete(formData: FormData) {
        'use server';
        let origen = formData.get('origen') as string;
        let destino = formData.get('destino') as string;
        let tallaenvio = formData.get('tallaenvio') as string;
        let costo = formData.get('costo') as unknown as number;
        let id_paqueteria = formData.get('id_paqueteria') as unknown as number;
        let flete = await getCosto(costo.toString());
    
        if (flete.length > 0) {
            return console.log('Costo ya existe');              
                // TODO: Handle errors with useFormStatus - return 'Costo ya existe';
        } else {
            await createCosto(origen, destino, tallaenvio, costo, id_paqueteria);
            redirect('/ProtectedConsultaFlete');
        }             
    }

    return (
        <div className="lg:col-span-4 sm:col-span-12 rounded-3xl bg-zinc-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    <FiFolder />
                    Fletes
                </h3>
                <h3 className="font-normal">
                    Guardar un costo
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
                <FormCostoFlete action={costoFlete}>
                    <SubmitButtonFlete>Capturar</SubmitButtonFlete>
                </FormCostoFlete>
            </div>
        </div>
    );
}