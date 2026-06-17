import React, { useState } from "react";
import { Pagination } from "../../components/Pagination";

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
        <div className="px-4 pb-2">
          <Pagination
            currentPage={paginaActual}
            totalPages={totalPaginas}
            onPageChange={setPaginaActual}
          />
        </div>
      </div>
        </>
    );
}