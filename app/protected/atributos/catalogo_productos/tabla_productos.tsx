
import { dbTablas, catalogo_productos } from "@/app/schema";

export default async function TablaProductos() {
    

    let productos: any[] = [];
    try {
        productos = await dbTablas.select().from(catalogo_productos).orderBy(catalogo_productos.codigo_producto);
    }
    catch (e: any) {
        console.error(e);
    }

    return (
        <>
        <div className="relative flex flex-col w-full h-full overflow-scroll text-slate-300 bg-neutral-800 shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto min-w-max">   
                <thead>
                    <tr>
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Codigo</th>
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Nombre</th>
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Clave SAT</th> 
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Empresa</th> 
                        <th className='p-4 border-b uppercase border-neutral-500 text-slate-100 bg-zinc-900'>Registrado por:</th>
                    </tr>
                </thead>
                <tbody>
                    {productos && productos.map((producto: any, index: number) => (
                        <tr className={index % 2 ? "bg-stone-700 text-sm hover:bg-black hover:text-white border-b border-neutral-500" : "text-sm hover:bg-black hover:text-white border-b border-neutral-500"} key={producto.id}>
                            <td className="p-4">{producto.codigo_producto}</td>
                            <td className="p-4">{producto.nombre_producto}</td>
                            <td className="p-4">{producto.clave_sat}</td>
                            <td className="p-4">{producto.empresa_producto}</td>
                            <td className="p-4">{producto.correo_empleado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center px-4 py-3">
                <div className="text-sm text-slate-200">
                    Mostrando <b> productosPorPagina </b>-
                    <b></b> de <b></b>
                </div>
                <div className="flex space-x-1">
                    <button
                       
                        className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
                    >
                        Prev
                    </button>
                    <button
                       
                        className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
                    >
                        Sig
                    </button>
                </div>
            </div>
        </div>    

        </>
    )
}
