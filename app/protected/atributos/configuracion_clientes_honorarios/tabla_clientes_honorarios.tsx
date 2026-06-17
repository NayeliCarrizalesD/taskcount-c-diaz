
'use client';

import { useState, useEffect } from 'react';

export default function TablaClienteHonorarios() {
    const [productos, setProductos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchClientesHonorarios() {
            try {
                setLoading(true);
                const response = await fetch('/api/todas-config-honorarios');
                
                if (!response.ok) {
                    throw new Error('Error al cargar los datos');
                }
                
                const data = await response.json();
                setProductos(data);
            } catch (e: any) {
                console.error(e);
                setError('Error al cargar los datos de configuración');
            } finally {
                setLoading(false);
            }
        }

        fetchClientesHonorarios();
    }, []);

    return (
        <>
        {loading && (
            <div className="flex flex-col justify-center items-center p-12 space-y-3">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-400"></div>
                <div className="text-gray-400 text-sm">Cargando datos...</div>
            </div>
        )}
        
        {error && (
            <div className="flex justify-center items-center p-8">
                <div className="text-red-500">{error}</div>
            </div>
        )}
        
        {!loading && !error && (
        <div className="custom-table-container">
            <table className="custom-table">   
                <thead className="custom-table-thead">
                    <tr>
                        <th className="custom-table-th uppercase">Cliente</th>
                        <th className="custom-table-th uppercase">Concepto</th>
                        <th className="custom-table-th uppercase">Cantidad a pagar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos && productos.map((producto: any) => (
                        <tr className="custom-table-tr" key={producto.id_cliente_honorario}>
                            <td>{producto.nombre_cliente}</td>
                            <td>{producto.concepto}</td>
                            <td>$ {producto.pago}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex items-center my-3 mx-2 flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-{productos.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{productos.length}</span></span>
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
        )}
        </>
    )
}
