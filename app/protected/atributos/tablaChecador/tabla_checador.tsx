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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg  w-full h-full overflow-scroll  rounded-lg bg-clip-border bg-zinc-900 my-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400w-full bg-neutral-800  dark:text-gray-400 table-auto min-w-max">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                <nav className="flex items-center my-3 mx-2 flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
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
    );
}