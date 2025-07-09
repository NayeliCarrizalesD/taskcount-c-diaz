import TablaClientes from "../catalogo_clientes/tabla_clientes";


export async function PlaceholderTablaClientesPequenio() {

    return (
        <div className="lg:col-span-8 sm:col-span-12 overflow-hidden rounded-3xl bg-zinc-800 shadow-xl h-[600px] sm:h-auto overflow-y-scroll scrollbar-thin">
            <div className="p-4">
                <h3 className="flex items-center text-lg gap-1.5 font-medium">
                    Clientes
                </h3>
                <h3 className="font-normal">
                    Clientes Registrados
                </h3>
            </div>
            <div className="h-[auto] sm:h-auto px-4 flex-row items-center ">
             <TablaClientes/>
            </div>
        </div>
    )
}