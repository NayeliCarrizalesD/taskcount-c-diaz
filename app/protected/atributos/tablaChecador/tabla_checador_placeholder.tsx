import TablaChecador from "./tabla_checador";

export async function TablaChecadorFull() {

    return (
        <div className="lg:col-span-12 sm:col-span-12 rounded-3xl bg-zinc-900 border shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    Entradas / Salidas
                </h3>
                <h3 className="font-normal">
                    Registros
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
             <TablaChecador />
            </div>
        </div>
    );
}