import { CheckHora } from "@/app/protected/atributos/check_entrada_salida/check_hora";
import FormularioChecarEntrada from "../registro_entrada_salida/place_formulario";


export const PlaceholderCheckHora = () => {
    return (
        <div className="lg:col-span-8 sm:col-span-12 overflow-hidden rounded-3xl bg-slate-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 font-medium">
                    Hora
                </h3>
            </div>

            <div className="h-64 px-4">
            <CheckHora/>      
            
            </div>
        </div>
    );
};