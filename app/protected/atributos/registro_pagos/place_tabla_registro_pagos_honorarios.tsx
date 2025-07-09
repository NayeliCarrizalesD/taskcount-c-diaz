import TablaPagosHonorarios from "./tabla_resgitro_pago";


export async function PlaceholderTablaPagosHonorarios() {

    return (
        <div className="lg:col-span-8 sm:col-span-12 overflow-hidden rounded-3xl bg-slate-800 shadow-xl h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    Pagos Honorarios
                </h3>
                <h3 className="font-normal">
                    Ver los pagos que se han realizado de los clientes por honorarios
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
             <TablaPagosHonorarios />
            </div>
        </div>
    )
}