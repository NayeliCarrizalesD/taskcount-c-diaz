import { dbTablas, datosUsuario } from "@/app/schema";

export default async function TablaDatosUsuarios() {
    let usuarios: any[] = [];
    try {
        usuarios = await dbTablas.select().from(datosUsuario).orderBy(datosUsuario.apellido);
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
                        <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Nombre</th>
                        <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Apellido</th> 
                        <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Correo</th>
                        <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Nivel</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios && usuarios.map((usuario: any, index: number) => (
                        <tr className={index % 2 ? "bg-stone-700 text-sm hover:bg-black hover:text-white border-b border-neutral-500" : "text-sm hover:bg-black hover:text-white border-b border-neutral-500"} key={usuario.id}>
                            <td className="p-4">{usuario.nombre}</td>
                            <td className="p-4">{usuario.apellido}</td>
                            <td className="p-4">{usuario.correo}</td>
                            <td className="p-4">
                                {usuario.nivel === "na1"?"Administrador":""}
                                {usuario.nivel === "n1"?"Nivel 1":""}
                                {usuario.nivel === "n2"?"Nivel 2":""}
                                {usuario.nivel === "n3"?"Nivel 3":""}           
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center px-4 py-3">
                <div className="text-sm text-slate-200">
                    Mostrando <b>1-5</b> de 45
                </div>
                <div className="flex space-x-1">
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Prev
                    </button>
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                        1
                    </button>                   
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Sig
                    </button>
                </div>
            </div>
        </div>    

        </>
    )
}
