import React, { useState, useMemo, useEffect } from "react";
import { Pagination } from "../../components/Pagination";

const meses = [
  "", // Para que el índice 1 sea "Enero"
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function TablaPagosHonorarios({
  searchQuery,
  datosTabla,
}: {
  searchQuery: string;
  datosTabla: any[];
}) {
  // Resetear la paginación a la página 1 cuando cambia la búsqueda
  const [paginaActual, setPaginaActual] = useState(1);
  
  useEffect(() => {
    setPaginaActual(1);
  }, [searchQuery]);

  // Filtra los datos por la consulta de búsqueda usando coincidencia tipo LIKE
  const datosFiltrados = useMemo(() => {
    if (!searchQuery.trim()) return datosTabla;
    const query = searchQuery.toLowerCase().trim();

    return datosTabla.filter((item) => {
      const nombreCliente = (item.nombre_cliente || `Cliente ID: ${item.id_cliente}`).toLowerCase();
      const concepto = (item.concepto || "").toLowerCase();
      const pago = String(item.pago || "").toLowerCase();
      const year = String(item.year_pago || "").toLowerCase();
      const mesNum = Number(item.mes_pago);
      const mesNombre = (mesNum && meses[mesNum] ? meses[mesNum] : "").toLowerCase();
      const correo = (item.correo_empleado || "").toLowerCase();
      const fechaRealizacion = (item.fecha_realizacion_pago || "").toLowerCase();

      return (
        nombreCliente.includes(query) ||
        concepto.includes(query) ||
        pago.includes(query) ||
        year.includes(query) ||
        mesNombre.includes(query) ||
        correo.includes(query) ||
        fechaRealizacion.includes(query)
      );
    });
  }, [datosTabla, searchQuery]);

  // PAGINACIÓN
  const pagosPorPagina = 20;
  const totalPaginas = Math.ceil(datosFiltrados.length / pagosPorPagina);

  const indiceUltimoPago = paginaActual * pagosPorPagina;
  const indicePrimerPago = indiceUltimoPago - pagosPorPagina;
  const pagosActuales = useMemo(() => {
    return datosFiltrados.slice(indicePrimerPago, indiceUltimoPago);
  }, [datosFiltrados, indicePrimerPago, indiceUltimoPago]);

  const formatFechaRealizacion = (fecha: any) => {
    if (!fecha) return "No registrada";
    try {
      const dateStr = String(fecha).trim();
      const onlyDate = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
      const parts = onlyDate.split("-");
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return dateStr;
    } catch {
      return String(fecha);
    }
  };

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
            {pagosActuales.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400 text-sm">
                  No se encontraron pagos coincidentes.
                </td>
              </tr>
            ) : (
              pagosActuales.map((item) => (
                <tr className="custom-table-tr" key={item.id_pago}>
                  <td>{item.nombre_cliente || `Cliente ID: ${item.id_cliente}`}</td>
                  <td>{item.concepto}</td>
                  <td>{item.pago}</td>
                  <td>{meses[Number(item.mes_pago)]}</td>
                  <td>{item.year_pago}</td>
                  <td>{formatFechaRealizacion(item.fecha_realizacion_pago)}</td>
                  <td>{item.correo_empleado}</td>
                </tr>
              ))
            )}
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