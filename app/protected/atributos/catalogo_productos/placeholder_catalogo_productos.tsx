import TablaProductos from "./tabla_productos";


export async function PlaceholderTablaConceptos() {

    return (
        <div className="lg:col-span-6 sm:col-span-12 overflow-hidden rounded-3xl bg-slate-800 shadow-xl h-[auto] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    Conceptos
                </h3>
                <h3 className="font-normal">
                    Listado de conceptos de servicios y productos.
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
             <TablaProductos/>
            </div>
        </div>
    )
}