"use client";

import { useMemo, useState, useEffect } from "react";
import { FaFileInvoiceDollar, FaCheckCircle, FaExclamationTriangle, FaTrashAlt } from "react-icons/fa";
import { Pagination } from "../../../components/Pagination";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/navigation';

const MySwal = withReactContent(Swal);

const MESES = [
  "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

interface Pago {
  id_pago: number;
  marca_temporal: string | null;
  id_cliente: string | null;
  concepto: string | null;
  pago: string | null;
  mes_pago: number | null;
  year_pago: string | null;
  correo_empleado: string | null;
  fecha_realizacion_pago?: string | null;
  estatus?: string | null;
}

interface PaymentTableProps {
  pagos: Pago[];
}

export default function PaymentTable({ pagos }: PaymentTableProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/usuario-actual");
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.correo || "");
          setIsAdmin(data.nivel === "na1" || data.nivel === "n1"); // na1 = Administrador, n1 = Nivel 1
        }
      } catch (err) {
        console.error("Error checking user:", err);
      }
    };
    checkUser();
  }, []);

  const handleEditPago = async (pago: Pago) => {
    if (!isAdmin) return;

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 9 }, (_, i) => {
      const year = currentYear - i;
      return `<option value="${year}" ${String(year) === String(pago.year_pago) ? 'selected' : ''}>${year}</option>`;
    }).join('');

    const formattedDate = pago.fecha_realizacion_pago 
      ? pago.fecha_realizacion_pago 
      : new Date().toISOString().split('T')[0];

    const result = await MySwal.fire({
      title: 'Editar Registro de Pago',
      html: `
        <div class="text-left space-y-4">
          <div class="bg-sky-950/30 border border-sky-900/40 p-4 rounded-2xl text-sm space-y-1.5 text-stone-300">
            <div>
              <span class="text-stone-500 text-xs uppercase tracking-wider font-semibold">Transacción ID</span>
              <div class="font-bold text-white text-base mt-0.5">#${pago.id_pago}</div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-1.5 pt-2 border-t border-sky-900/20">
              <div>
                <span class="text-stone-500 text-xs uppercase tracking-wider font-semibold block">Concepto actual</span>
                <span class="font-medium text-white text-sm mt-0.5 block">${pago.concepto || "Pago Honorarios"}</span>
              </div>
              <div>
                <span class="text-stone-500 text-xs uppercase tracking-wider font-semibold block">Importe actual</span>
                <span class="font-bold text-emerald-400 text-sm mt-0.5 block">$${Number(pago.pago).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Mes a pagar</label>
              <select id="edit-mes-pago" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm cursor-pointer">
                <option value="">Seleccionar mes</option>
                ${MESES.slice(1).map((mes, index) =>
                  `<option value="${index + 1}" ${index + 1 === Number(pago.mes_pago) ? 'selected' : ''}>${mes}</option>`
                ).join('')}
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Año</label>
              <select id="edit-year_pago" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm cursor-pointer">
                <option value="">Año</option>
                ${yearOptions}
              </select>        
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Concepto</label>
            <input id="edit-concepto-pago" type="text" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm" value="${pago.concepto || 'Pago Honorarios'}">
          </div>
          
          <div>
            <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">Monto a pagar</label>
            <div class="relative rounded-xl shadow-sm">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-stone-500 sm:text-sm">$</span>
              </div>
              <input id="edit-monto-pago" type="number" class="w-full pl-7 pr-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm" value="${pago.pago}" step="0.01">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1" for="edit-fecha_realizacion_pago">Fecha de pago en oficina</label>
              <input id="edit-fecha_realizacion_pago" type="date" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm" value="${formattedDate}">
            </div>
            <div>
              <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1" for="edit-estatus">Estatus del pago</label>
              <select id="edit-estatus" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm cursor-pointer">
                <option value="activo" ${pago.estatus === 'activo' || !pago.estatus ? 'selected' : ''}>Activo</option>
                <option value="pendiente" ${pago.estatus === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                <option value="cancelado" ${pago.estatus === 'cancelado' ? 'selected' : ''}>Cancelado</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1" for="edit-correo_empleado">Correo empleado</label>
            <input id="edit-correo_empleado" name="edit_correo_empleado" type="email" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm" value="${pago.correo_empleado || currentUser}" />
          </div>
        </div>
      `,
      width: '460px',
      showCancelButton: true,
      color: "white",
      background: "#0d0d0e",
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-3xl border border-zinc-800 p-6 shadow-2xl',
        title: 'text-xl font-bold tracking-tight text-white pt-2 px-2 text-left w-full',
        htmlContainer: 'text-left mx-2 my-0',
        actions: 'flex justify-end gap-3 mt-6 px-2 w-full',
        confirmButton: 'px-5 py-2.5 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors duration-150 text-sm cursor-pointer',
        cancelButton: 'px-5 py-2.5 rounded-xl font-semibold bg-zinc-800 hover:bg-zinc-700 text-stone-300 transition-colors duration-150 text-sm cursor-pointer',
        validationMessage: 'bg-red-950/40 border border-red-900/40 text-red-200 rounded-xl p-3 my-2 text-xs flex items-center gap-2'
      },
      confirmButtonText: 'Actualizar Pago',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const mes = (document.getElementById('edit-mes-pago') as HTMLSelectElement).value;
        const year = (document.getElementById('edit-year_pago') as HTMLInputElement).value;
        const concepto = (document.getElementById('edit-concepto-pago') as HTMLInputElement).value;
        const monto = (document.getElementById('edit-monto-pago') as HTMLInputElement).value;
        const input = document.getElementById('edit-correo_empleado') as HTMLInputElement;
        const correoEmpleado = input ? input.value : "";
        const fechaRealizacionInput = document.getElementById('edit-fecha_realizacion_pago') as HTMLInputElement;
        const fechaRealizacion = fechaRealizacionInput ? fechaRealizacionInput.value : "";
        const estatus = (document.getElementById('edit-estatus') as HTMLSelectElement).value;

        if (!mes || !year || !concepto || !monto || !correoEmpleado || !fechaRealizacion || !estatus) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoEmpleado)) {
          Swal.showValidationMessage('El formato del correo no es válido');
          return false;
        }

        return {
          concepto,
          mes_pago: parseInt(mes),
          year_pago: parseInt(year),
          pago: parseFloat(monto),
          correo_empleado: correoEmpleado,
          fecha_realizacion_pago: fechaRealizacion,
          estatus
        };
      }
    });

    if (result.isConfirmed && result.value) {
      try {
        const response = await fetch(`/api/pago-honorarios/${pago.id_pago}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result.value),
        });

        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: 'El pago ha sido actualizado correctamente.',
            timer: 2000,
            showConfirmButton: false,
            color: "white",
            background: "#0d0d0e",
            customClass: {
              popup: 'rounded-3xl border border-zinc-800 p-6'
            }
          });
          router.refresh();
        } else {
          const errData = await response.json();
          throw new Error(errData.error || 'Error al actualizar el pago');
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err instanceof Error ? err.message : 'No se pudo actualizar el pago',
          color: "white",
          background: "#0d0d0e",
          buttonsStyling: false,
          customClass: {
            popup: 'rounded-3xl border border-zinc-800 p-6',
            title: 'text-xl font-bold tracking-tight text-white pt-2',
            confirmButton: 'px-5 py-2.5 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors duration-150 text-sm cursor-pointer'
          }
        });
      }
    }
  };
  // Función auxiliar para formatear la fecha de realización de YYYY-MM-DD a DD/MM/YYYY
  const formatFechaRealizacion = (fecha: any) => {
    if (!fecha) return "No registrada";
    if (fecha instanceof Date) {
      return fecha.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
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

  // Función auxiliar para extraer fecha y hora legibles de la marca temporal
  const formatMarcaTemporal = (marca: any) => {
    if (!marca) return { fecha: "N/A", hora: "--:--:--" };
    try {
      const d = marca instanceof Date ? marca : new Date(marca);
      if (isNaN(d.getTime())) {
        // Fallback en caso de que sea un string plano no-ISO
        return { fecha: String(marca), hora: "--:--:--" };
      }
      const fecha = d.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const hora = d.toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      return { fecha, hora };
    } catch {
      return { fecha: String(marca), hora: "--:--:--" };
    }
  };

  const [mostrarCancelados, setMostrarCancelados] = useState(false);

  const handleCancelarPago = async (id_pago: number) => {
    if (!isAdmin) return;
    
    const confirmacion = await MySwal.fire({
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
          MySwal.fire({
            icon: 'success',
            title: '¡Cancelado!',
            text: 'El pago ha sido cancelado con éxito.',
            timer: 2000,
            showConfirmButton: false,
            color: "white",
            background: "#0d0d0e",
            customClass: {
              popup: 'rounded-3xl border border-zinc-800 p-6'
            }
          });
          router.refresh();
        } else {
          const errData = await response.json();
          throw new Error(errData.error || "No se pudo cancelar el pago");
        }
      } catch (err: any) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message || 'No se pudo cancelar el pago',
          color: "white",
          background: "#0d0d0e",
          buttonsStyling: false,
          customClass: {
            popup: 'rounded-3xl border border-zinc-800 p-6',
            confirmButton: 'px-5 py-2.5 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 text-white transition-colors duration-150 text-sm cursor-pointer'
          }
        });
      }
    }
  };

  const formattedPagos = useMemo(() => {
    let temp = pagos;
    if (!mostrarCancelados) {
      temp = temp.filter(p => p.estatus !== 'cancelado');
    }
    const sorted = [...temp].sort((a, b) => {
      const mesA = a.mes_pago ?? 0;
      const mesB = b.mes_pago ?? 0;
      if (mesB !== mesA) {
        return mesB - mesA;
      }
      return b.id_pago - a.id_pago;
    });

    return sorted.map((pago) => {
      const { fecha, hora } = formatMarcaTemporal(pago.marca_temporal);
      return {
        ...pago,
        fecha,
        hora,
      };
    });
  }, [pagos, mostrarCancelados]);

  const [paginaActual, setPaginaActual] = useState(1);
  const pagosPorPagina = 12;
  const totalPaginas = Math.ceil(formattedPagos.length / pagosPorPagina);
  
  useEffect(() => {
    setPaginaActual(1);
  }, [pagos, mostrarCancelados]);

  const pagosActuales = useMemo(() => {
    return formattedPagos.slice((paginaActual - 1) * pagosPorPagina, paginaActual * pagosPorPagina);
  }, [formattedPagos, paginaActual]);

  if (formattedPagos.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-end pr-2">
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
        <div className="flex flex-col items-center justify-center p-8 bg-neutral-950/40 rounded-xl border border-zinc-700/50 text-stone-400">
          <FaExclamationTriangle className="text-amber-500 text-3xl mb-2" />
          <p className="text-sm font-medium">No se encontraron pagos registrados para este año.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end pr-2">
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
      <div className="custom-table-container max-h-[400px] overflow-y-auto">
        <table className="custom-table">
          <thead className="custom-table-thead">
            <tr>
              <th className="custom-table-th">ID Pago</th>
              <th className="custom-table-th">Concepto</th>
              <th className="custom-table-th">Mes Pagado</th>
              <th className="custom-table-th">Año Pagado</th>
              <th className="custom-table-th">F. Realización</th>
              <th className="custom-table-th">Cobrado</th>
              <th className="custom-table-th">Estado</th>
              <th className="custom-table-th">Importe</th>
              <th className="custom-table-th">Registrado Por</th>
              {isAdmin && <th className="custom-table-th text-center">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {pagosActuales.map((pago) => (
              <tr
                key={pago.id_pago}
                className="custom-table-tr"
              >
                <td className="p-4 font-semibold">
                  <span
                    onClick={() => handleEditPago(pago)}
                    className={`inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 text-xs px-2.5 py-1 rounded-md ${
                      isAdmin ? "cursor-pointer hover:bg-zinc-800 hover:border-zinc-500 hover:text-sky-300 transition-all text-white" : "text-sky-400"
                    }`}
                  >
                    <FaFileInvoiceDollar /> #{pago.id_pago}
                  </span>
                </td>
                <td className="p-4 font-medium text-stone-200">{pago.concepto || "Pago Honorarios"}</td>
                <td className="p-4 text-stone-300">
                  {pago.mes_pago && MESES[pago.mes_pago] ? MESES[pago.mes_pago] : "No registrado"}
                </td>
                <td className="p-4 text-stone-400 font-mono text-xs">
                  {pago.year_pago || "No registrado"}
                </td>
                <td className="p-4 text-sky-300 font-medium">{formatFechaRealizacion(pago.fecha_realizacion_pago)}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs bg-emerald-950/50 border border-emerald-800 px-2 py-0.5 rounded-full">
                    <FaCheckCircle className="text-xs" /> Sí
                  </span>
                </td>
                <td className="p-4">
                  {pago.estatus === 'cancelado' ? (
                    <span className="inline-flex items-center gap-1 text-red-400 font-semibold text-[10px] uppercase bg-red-950/40 border border-red-900/30 px-2.5 py-0.5 rounded-full">
                      Cancelado
                    </span>
                  ) : pago.estatus === 'pendiente' ? (
                    <span className="inline-flex items-center gap-1 text-amber-400 font-semibold text-[10px] uppercase bg-amber-950/40 border border-amber-900/30 px-2.5 py-0.5 rounded-full">
                      Pendiente
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[10px] uppercase bg-emerald-950/40 border border-emerald-800/30 px-2.5 py-0.5 rounded-full">
                      Activo
                    </span>
                  )}
                </td>
                <td className="p-4 font-bold text-white">
                  $
                  {(Number(pago.pago) || 0).toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  MXN
                </td>
                <td className="p-4 text-stone-400 text-xs truncate max-w-[180px]" title={pago.correo_empleado || undefined}>
                  {pago.correo_empleado || "Sistema"}
                </td>
                {isAdmin && (
                  <td className="text-center p-4">
                    {pago.estatus !== 'cancelado' ? (
                      <button
                        onClick={() => handleCancelarPago(pago.id_pago)}
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
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-zinc-800/50">
          <Pagination
            currentPage={paginaActual}
            totalPages={totalPaginas}
            onPageChange={setPaginaActual}
          />
        </div>
      </div>
    </div>
  );
}
