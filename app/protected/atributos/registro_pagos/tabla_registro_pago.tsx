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
    ? datosTabla.filter((item) => item.id_cliente === clienteSeleccionado)
    : datosTabla;

const meses = [
  "", // Para que el índice 1 sea "Enero"
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const pagosPorPagina = 20;
  const totalPaginas = Math.ceil(datosFiltrados.length / pagosPorPagina);

  const indiceUltimoPago = paginaActual * pagosPorPagina;
  const indicePrimerPago = indiceUltimoPago - pagosPorPagina;
  const pagosActuales = datosFiltrados.slice(indicePrimerPago, indiceUltimoPago);


    return (
        <>
            <div className="custom-table-container">
        <table className="custom-table">
          <thead className="custom-table-thead">
            <tr>
              <th className="custom-table-th">Nombre del Cliente</th>
              <th className="custom-table-th">Concepto</th>
              <th className="custom-table-th">Cantidad</th>
              <th className="custom-table-th">Mes de Pago</th>
              <th className="custom-table-th">Año de Pago</th>
              <th className="custom-table-th">Fecha Realización</th>
              <th className="custom-table-th">Registrado por:</th>
            </tr>
          </thead>
            <tbody>
              {pagosActuales.map((item) => (
                <tr className="custom-table-tr" key={item.id_pago}>
                  <td>{item.nombre_cliente || `Cliente ID: ${item.id_cliente}`}</td>
                  <td>{item.concepto}</td>
                  <td>{item.pago}</td>
                  <td>{meses[Number(item.mes_pago)]}</td>
                  <td>{item.year_pago}</td>
                  <td>{item.fecha_realizacion_pago ? item.fecha_realizacion_pago.split('-').reverse().join('/') : "No registrada"}</td>
                  <td>{item.correo_empleado}</td>
                </tr>
              ))}
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
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${
                    paginaActual === i + 1 
                      ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500" 
                      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
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