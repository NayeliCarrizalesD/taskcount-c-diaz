
'use client';

import { useState, useEffect } from 'react';
import { Pagination } from "../../components/Pagination";

export default function TablaClienteHonorarios() {
    const [productos, setProductos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 10;
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);

    const productosActuales = productos.slice((paginaActual - 1) * productosPorPagina, paginaActual * productosPorPagina);

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
                    {productosActuales && productosActuales.map((producto: any) => (
                        <tr className="custom-table-tr" key={producto.id_cliente_honorario}>
                            <td>{producto.nombre_cliente}</td>
                            <td>{producto.concepto}</td>
                            <td>$ {producto.pago}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="px-4 pb-2">
                <Pagination
                    currentPage={paginaActual}
                    totalPages={totalPaginas}
                    onPageChange={setPaginaActual}
                />
            </div>
           
        </div>    
        )}
        </>
    )
}
