import TablaChecador from "../tablaChecador/tabla_checador";



export async function TablaEntradaSalida() {

    return (
        <div className="lg:col-span-8 sm:col-span-12 rounded-3xl bg-zinc-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    Checador
                </h3>
                <h3 className="font-normal">
                    Ver las entradas y salidas
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
             <TablaChecador />
            </div>
        </div>
    );
}