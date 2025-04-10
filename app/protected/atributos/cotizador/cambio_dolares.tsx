import { FiDollarSign } from "react-icons/fi";

export const CambioDolares = () => {
    return (
        <div className="lg:col-span-8 sm:col-span-12 overflow-hidden rounded-3xl bg-zinc-800 border border-stone-500 shadow-lg">
            <div className="p-4">
                <h3 className="flex items-center gap-1.5 font-medium">
                    <FiDollarSign /> Revisar el valor del dolar
                </h3>
            </div>

            <div className="h-64 px-4">
                <iframe className="w-full rounded-md bg-slate-100" height={680} src="https://dof.gob.mx/indicadores.php#gsc.tab=0"></iframe>             
            </div>
        </div>
    );
};