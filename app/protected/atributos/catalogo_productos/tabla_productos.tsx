
import { dbTablas, catalogo_productos } from "@/app/schema";

export default async function TablaProductos() {
    

    let productos: any[] = [];
    try {
        productos = await dbTablas.select().from(catalogo_productos).orderBy(catalogo_productos.nombre_producto_servicio);
    }
    catch (e: any) {
        console.error(e);
    }

    return (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  w-full h-full overflow-scroll  rounded-lg bg-clip-border bg-zinc-900 my-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400w-full bg-neutral-800  dark:text-gray-400 table-auto min-w-max">   
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Nombre del concepto</th>
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Registrado por:</th>
                    </tr>
                </thead>
                <tbody>
                    {productos && productos.map((producto: any, index: number) => (
                        <tr className={index % 2 ? "bg-stone-700 text-sm hover:bg-black hover:text-white border-b border-neutral-500" : "text-sm hover:bg-black hover:text-white border-b border-neutral-500"} key={producto.id}>
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{producto.nombre_producto_servicio}</td>
                            <td className="p-4">{producto.correo_empleado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex items-center my-3 flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
            </li>
            <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
           
            <li>
                <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
            </li>
            
            <li>
        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
            </li>
        </ul>
    </nav>
           
        </div>    

        </>
    )
}
