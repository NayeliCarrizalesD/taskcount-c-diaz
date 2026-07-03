import React, { useState, useMemo, useEffect } from "react";
import { Pagination } from "../../components/Pagination";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const meses = [
  "", // Para que el índice 1 sea "Enero"
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function TablaPagosHonorarios({
  searchQuery,
  datosTabla,
  onRefresh,
}: {
  searchQuery: string;
  datosTabla: any[];
  onRefresh?: () => void;
}) {
  // Resetear la paginación a la página 1 cuando cambia la búsqueda
  const [paginaActual, setPaginaActual] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mostrarCancelados, setMostrarCancelados] = useState(false);
  
  useEffect(() => {
    setPaginaActual(1);
  }, [searchQuery, mostrarCancelados]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/usuario-actual");
        if (res.ok) {
          const data = await res.json();
          setIsAdmin(data.nivel === "na1"); // na1 = Administrador
        }
      } catch (err) {
        console.error("Error checking user:", err);
      }
    };
    checkUser();
  }, []);

  const handleCancelarPago = async (id_pago: number) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cambiará el estatus de este pago a 'cancelado' y ya no se contabilizará en los reportes.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#27272a",
      confirmButtonText: "Sí, cancelar pago",
      cancelButtonText: "No, regresar",
      background: "#0d0d0e",
      color: "#fff",
      customClass: {
        popup: 'rounded-3xl border border-zinc-800 p-6 shadow-2xl',
        confirmButton: 'px-5 py-2.5 rounded-xl font-semibold bg-red-600 hover:bg-red-500 text-white transition-colors duration-150 text-sm cursor-pointer',
        cancelButton: 'px-5 py-2.5 rounded-xl font-semibold bg-zinc-800 hover:bg-zinc-700 text-stone-300 transition-colors duration-150 text-sm cursor-pointer ml-3'
      },
      buttonsStyling: false
    });

    if (confirmacion.isConfirmed) {
      try {
        const response = await fetch(`/api/pago-honorarios/${id_pago}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire({
            title: "¡Cancelado!",
            text: "El pago ha sido cancelado con éxito.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            background: "#0d0d0e",
            color: "#fff",
            customClass: {
              popup: 'rounded-3xl border border-zinc-800 p-6'
            }
          });
          if (onRefresh) {
            onRefresh();
          }
        } else {
          const errData = await response.json();
          throw new Error(errData.error || "No se pudo cancelar el pago");
        }
      } catch (error: any) {
        Swal.fire({
          title: "Error",
          text: error.message || "Ocurrió un error al intentar cancelar el pago.",
          icon: "error",
          background: "#0d0d0e",
          color: "#fff",
          customClass: {
            popup: 'rounded-3xl border border-zinc-800 p-6'
          }
        });
      }
    }
  };

  // Filtra los datos por la consulta de búsqueda usando coincidencia tipo LIKE
  const datosFiltrados = useMemo(() => {
    let baseDatos = datosTabla;
    if (!mostrarCancelados) {
      baseDatos = baseDatos.filter((item) => item.estatus !== 'cancelado');
    }
    if (!searchQuery.trim()) return baseDatos;
    const query = searchQuery.toLowerCase().trim();

    return baseDatos.filter((item) => {
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
  }, [datosTabla, searchQuery, mostrarCancelados]);

  // PAGINACIÓN
  const pagosPorPagina = 10;
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
      <div className="flex justify-end mb-3">
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={mostrarCancelados}
            onChange={(e) => setMostrarCancelados(e.target.checked)}
            className="rounded border-zinc-700 bg-neutral-900 text-sky-500 focus:ring-sky-500/20 focus:ring-offset-0 focus:outline-none h-4 w-4 transition-colors cursor-pointer"
          />
          Mostrar pagos cancelados
        </label>
      </div>
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
              <th className="custom-table-th">Estado</th>
              {isAdmin && <th className="custom-table-th text-center">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {pagosActuales.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 9 : 8} className="p-8 text-center text-gray-400 text-sm">
                  No se encontraron pagos coincidentes.
                </td>
              </tr>
            ) : (
              pagosActuales.map((item) => (
                <tr className="custom-table-tr" key={item.id_pago}>
                  <td>{item.nombre_cliente || `Cliente ID: ${item.id_cliente}`}</td>
                  <td>{item.concepto}</td>
                  <td>${Number(item.pago).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                  <td>{meses[Number(item.mes_pago)]}</td>
                  <td>{item.year_pago}</td>
                  <td>{formatFechaRealizacion(item.fecha_realizacion_pago)}</td>
                  <td>{item.correo_empleado}</td>
                  <td>
                    {item.estatus === 'cancelado' ? (
                      <span className="inline-flex items-center gap-1 text-red-400 font-semibold text-[10px] uppercase bg-red-950/40 border border-red-900/30 px-2.5 py-0.5 rounded-full">
                        Cancelado
                      </span>
                    ) : item.estatus === 'pendiente' ? (
                      <span className="inline-flex items-center gap-1 text-amber-400 font-semibold text-[10px] uppercase bg-amber-950/40 border border-amber-900/30 px-2.5 py-0.5 rounded-full">
                        Pendiente
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[10px] uppercase bg-emerald-950/40 border border-emerald-800/30 px-2.5 py-0.5 rounded-full">
                        Activo
                      </span>
                    )}
                  </td>
                  {isAdmin && (
                    <td className="text-center">
                      {item.estatus !== 'cancelado' ? (
                        <button
                          onClick={() => handleCancelarPago(item.id_pago)}
                          className="text-red-400 hover:text-red-300 p-1.5 rounded-xl bg-red-950/30 border border-red-900/40 hover:bg-red-900/50 transition-colors cursor-pointer"
                          title="Cancelar Pago"
                        >
                          <FaTrashAlt className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <span className="text-zinc-600 text-xs">-</span>
                      )}
                    </td>
                  )}
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