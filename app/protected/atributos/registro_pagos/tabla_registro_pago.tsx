import React, { useState } from "react";

export default function TablaPagosHonorarios({
  clienteSeleccionado,
  datosTabla,
}: {
  clienteSeleccionado: string;
  datosTabla: any[];
}) {
  // Filtra los datos por el cliente seleccionado
  const datosFiltrados = clienteSeleccionado
    ? datosTabla.filter((item) => item.nombre_cliente === clienteSeleccionado)
    : datosTabla;

// PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const pagosPorPagina = 10;
  const totalPaginas = Math.ceil(datosFiltrados.length / pagosPorPagina);

  const indiceUltimoPago = paginaActual * pagosPorPagina;
  const indicePrimerPago = indiceUltimoPago - pagosPorPagina;
  const pagosActuales = datosFiltrados.slice(indicePrimerPago, indiceUltimoPago);


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-full overflow-scroll rounded-lg bg-clip-border bg-zinc-900 my-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-neutral-800 table-auto min-w-max">
          <thead>
            <tr>
              <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Nombre del Cliente</th>
              <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Concepto</th>
              <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Cantidad</th>
              <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Mes de Pago</th>
              <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Año de Pago</th>
              <th className='p-4 border-b border-neutral-500 text-slate-100 bg-zinc-900'>Registrado por:</th>
            </tr>
          </thead>
          <tbody>
            {pagosActuales.map((item, index) => (
              <tr className={
                index % 2
          ? "bg-stone-700 text-sm hover:bg-black hover:text-white border-b border-neutral-500"
          : "text-sm hover:bg-black hover:text-white border-b border-neutral-500"
        } key={item.id_entrada}>
                <td className="p-4">{item.nombre_cliente}</td>
                <td className="p-4">{item.concepto}</td>
                <td className="p-4">{item.pago}</td>
                <td className="p-4">{item.mes_pago}</td>
                <td className="p-4">{item.year_pago}</td>
                <td className="p-4">{item.correo_empleado}</td>
              </tr>
            ))}
                        {/*{pagosTotales && pagosTotales.map((check: any, index: number) => (
                            <tr className={index % 2 ? "bg-stone-700 text-sm hover:bg-black hover:text-white border-b border-neutral-500" : "text-sm hover:bg-black hover:text-white border-b border-neutral-500"} key={check.id_entrada}>
                                <td className="p-4">{check.nombre_cliente}</td>
                                <td className="p-4">{check.concepto}</td>
                                <td className="p-4">{check.pago}</td>
                                <td className="p-4">{check.mes_pago}</td>
                                <td className="p-4">{check.year_pago}</td>
                                <td className="p-4">{check.correo_empleado}</td>
                                
                            </tr>
                        ))}*/}
                    </tbody>
                </table>
              {/* Paginación */}
        <nav className="flex items-center my-3 mx-2 flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Mostrando <span className="font-semibold text-gray-900 dark:text-white">{indicePrimerPago + 1}-{Math.min(indiceUltimoPago, datosFiltrados.length)}</span> de <span className="font-semibold text-gray-900 dark:text-white">{datosFiltrados.length}</span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual(paginaActual - 1)}
              >
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPaginas }, (_, i) => (
              <li key={i + 1}>
                <button
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${paginaActual === i + 1 ? "bg-blue-50 text-blue-600" : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => setPaginaActual(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual(paginaActual + 1)}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
            </div>
        </>
    );
}