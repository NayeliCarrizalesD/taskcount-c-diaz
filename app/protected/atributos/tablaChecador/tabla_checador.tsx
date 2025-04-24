import {  getEntradaSalidaUnUsuario } from 'app/schema';
import CopyButton from './copyButton';
import { auth } from '@/app/auth';

export default async function TablaChecador() {
    let session = await auth();
    let correo = session?.user?.email;

    let checador: any[] = [];
    //let checadorUsuario: string | undefined;
    
    try {
        correo?.toString();
        if (correo) {
        const checadorUno = await getEntradaSalidaUnUsuario(correo);
        checador = checadorUno;
       } 
    } catch (error) {
        console.error(error);   
    }

    return (
        <>
            <div className="relative flex flex-col w-full h-full overflow-scroll text-slate-300 bg-neutral-800 shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Fecha</th>
                            <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Hora</th>
                            <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Entrada / Salida</th>
                            <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Nombre</th>
                            <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Copiar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checador && checador.map((check: any, index: number) => (
                            <tr className={index % 2 ? "bg-stone-700 text-sm hover:bg-black hover:text-white border-b border-neutral-500" : "text-sm hover:bg-black hover:text-white border-b border-neutral-500"} key={check.id_entrada}>
                                <td className="p-4">{check.fecha_entrada_salida}</td>
                                <td className="p-4">{check.hora_entrada_salida}</td>
                                <td className="p-4">{check.checador}</td>
                                <td className="p-4">{check.nombre_empleado}</td>
                                <td className='mx-2 my-2'>
                                    <CopyButton hora={check.hora_entrada_salida} />
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
    );
}