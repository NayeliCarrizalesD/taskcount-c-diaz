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
            <div className="custom-table-container">
                <table className="custom-table">
                    <thead className="custom-table-thead">
                        <tr>
                            <th className="custom-table-th">Fecha</th>
                            <th className="custom-table-th">Hora</th>
                            <th className="custom-table-th">Entrada / Salida</th>
                            <th className="custom-table-th">Nombre</th>
                            <th className="custom-table-th">Copiar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checador && checador.map((check: any) => (
                            <tr className="custom-table-tr" key={check.id_entrada}>
                                <td>{check.fecha_entrada_salida}</td>
                                <td>{check.hora_entrada_salida}</td>
                                <td>{check.checador}</td>
                                <td>{check.nombre_empleado}</td>
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