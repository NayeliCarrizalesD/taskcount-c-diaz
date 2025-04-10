import TableFlete from "./tabla_costoFlete";



export async function TablaCostoFleteFull() {

    return (
        <div className="lg:col-span-12 sm:col-span-12 rounded-3xl bg-zinc-800 border border-stone-500 shadow-lg h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    Fletes
                </h3>
                <h3 className="font-normal">
                    Ver el costo de los fletes
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
             <TableFlete />
            </div>
        </div>
    );
}