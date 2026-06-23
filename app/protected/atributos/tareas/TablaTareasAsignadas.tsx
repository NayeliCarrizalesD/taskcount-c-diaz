"use client";

import { useMemo, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiTrash2, FiMessageSquare } from "react-icons/fi";
import Swal from "sweetalert2";
import { Pagination } from "../../components/Pagination";

interface Tarea {
  id_tarea: number;
  titulo: string;
  descripcion: string | null;
  prioridad: string | null;
  estado: string | null;
  fecha_limite: string | null;
  fecha_creacion: string | null;
  fecha_completada: string | null;
  creado_por: string | null;
  asignado_a: string | null;
}

interface TablaTareasAsignadasProps {
  tareas: Tarea[];
  onTareaModificada: () => void;
  showFullWidth?: boolean;
}

export default function TablaTareasAsignadas({
  tareas,
  onTareaModificada,
  showFullWidth = false,
}: TablaTareasAsignadasProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const tareasPorPagina = 10;

  useEffect(() => {
    setPaginaActual(1);
  }, [searchQuery]);

  // Filtro LIKE
  const tareasFiltradas = useMemo(() => {
    if (!searchQuery.trim()) return tareas;
    const query = searchQuery.toLowerCase().trim();

    return tareas.filter((t) => {
      const idStr = String(t.id_tarea);
      const titulo = (t.titulo || "").toLowerCase();
      const descripcion = (t.descripcion || "").toLowerCase();
      const asignado = (t.asignado_a || "").toLowerCase();
      const creado = (t.creado_por || "").toLowerCase();
      const prioridad = (t.prioridad || "").toLowerCase();
      const estado = (t.estado || "").toLowerCase();
      return (
        idStr.includes(query) ||
        titulo.includes(query) ||
        descripcion.includes(query) ||
        asignado.includes(query) ||
        creado.includes(query) ||
        prioridad.includes(query) ||
        estado.includes(query)
      );
    });
  }, [tareas, searchQuery]);

  const totalPaginas = Math.ceil(tareasFiltradas.length / tareasPorPagina);
  const tareasActuales = useMemo(() => {
    return tareasFiltradas.slice(
      (paginaActual - 1) * tareasPorPagina,
      paginaActual * tareasPorPagina
    );
  }, [tareasFiltradas, paginaActual]);

  // Manejar cambio de estado de la tarea
  const handleEstadoChange = async (id_tarea: number, nuevoEstado: string) => {
    try {
      const res = await fetch(`/api/tareas/${id_tarea}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (res.ok) {
        onTareaModificada();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "No se pudo actualizar el estado");
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "No se pudo actualizar el estado de la tarea.",
        color: "white",
        background: "#0d0d0e",
      });
    }
  };

  // Manejar eliminación de tarea
  const handleEliminarTarea = async (id_tarea: number, titulo: string) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar Tarea?",
      text: `¿Estás seguro de que deseas eliminar la tarea "${titulo}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      color: "white",
      background: "#0d0d0e",
      customClass: {
        popup: "rounded-3xl border border-zinc-800 p-6 shadow-2xl",
        confirmButton: "px-5 py-2.5 rounded-xl font-semibold bg-red-600 hover:bg-red-500 text-white text-sm cursor-pointer mr-2",
        cancelButton: "px-5 py-2.5 rounded-xl font-semibold bg-zinc-800 hover:bg-zinc-700 text-stone-300 text-sm cursor-pointer",
      },
      buttonsStyling: false,
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/tareas/${id_tarea}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Eliminada",
            text: "La tarea ha sido eliminada.",
            timer: 1500,
            showConfirmButton: false,
            color: "white",
            background: "#0d0d0e",
            customClass: { popup: "rounded-3xl border border-zinc-800" },
          });
          onTareaModificada();
        } else {
          const errorData = await res.json();
          throw new Error(errorData.error || "No se pudo eliminar la tarea");
        }
      } catch (err: any) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message || "No se pudo eliminar la tarea.",
          color: "white",
          background: "#0d0d0e",
        });
      }
    }
  };

  // Manejar comentarios mediante modal interactivo en SweetAlert2
  const showComments = async (id_tarea: number, titulo: string) => {
    try {
      const res = await fetch(`/api/tareas/${id_tarea}/comentarios`);
      const comentarios = res.ok ? await res.json() : [];

      const commentsHtml = comentarios.length > 0
        ? `<div class="space-y-2.5 max-h-60 overflow-y-auto mb-4 text-left border-b border-zinc-800 pb-4 pr-1.5 scrollbar-thin">
            ${comentarios.map((c: any) => `
              <div class="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/40 text-xs">
                <div class="flex justify-between items-center mb-1 text-stone-400">
                  <span class="font-bold text-sky-400 text-xs">${c.usuario}</span>
                  <span class="text-[10px]">${new Date(c.fecha_registro).toLocaleString('es-MX')}</span>
                </div>
                <p class="text-stone-200 text-sm whitespace-pre-wrap">${c.comentario}</p>
              </div>
            `).join("")}
           </div>`
        : `<div class="text-stone-400 text-sm py-6 text-center border-b border-zinc-800 mb-4">No hay comentarios en esta tarea.</div>`;

      const result = await Swal.fire({
        title: `Comentarios: ${titulo}`,
        html: `
          ${commentsHtml}
          <div class="text-left">
            <label class="block text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Nuevo Comentario</label>
            <textarea id="swal-comentario" class="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" placeholder="Escribe un comentario..." rows="2"></textarea>
          </div>
        `,
        preConfirm: () => {
          const val = (document.getElementById("swal-comentario") as HTMLTextAreaElement).value;
          return val;
        },
        showCancelButton: true,
        confirmButtonText: "Añadir Comentario",
        cancelButtonText: "Cerrar",
        color: "white",
        background: "#0d0d0e",
        customClass: {
          popup: "rounded-3xl border border-zinc-800 p-6 shadow-2xl w-[460px]",
          confirmButton: "px-5 py-2.5 rounded-xl font-semibold bg-sky-600 hover:bg-sky-500 text-white text-sm cursor-pointer mr-2",
          cancelButton: "px-5 py-2.5 rounded-xl font-semibold bg-zinc-800 hover:bg-zinc-700 text-stone-300 text-sm cursor-pointer",
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed && result.value && result.value.trim()) {
        const postRes = await fetch(`/api/tareas/${id_tarea}/comentarios`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comentario: result.value.trim() }),
        });

        if (postRes.ok) {
          // Refrescar el modal recursivamente
          showComments(id_tarea, titulo);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Clases y estilos de los Badges
  const getPriorityClass = (priority: string | null) => {
    switch (priority) {
      case "alta":
        return "bg-red-950/50 border border-red-800 text-red-400";
      case "baja":
        return "bg-teal-950/50 border border-teal-800 text-teal-400";
      case "media":
      default:
        return "bg-sky-950/50 border border-sky-800 text-sky-400";
    }
  };

  const getStatusSelectClass = (status: string | null) => {
    switch (status) {
      case "completada":
        return "bg-emerald-950/40 border border-emerald-800/80 text-emerald-400";
      case "en_progreso":
        return "bg-blue-950/40 border border-blue-800/80 text-blue-400";
      case "cancelada":
        return "bg-zinc-900 border border-zinc-800 text-stone-400";
      case "pendiente":
      default:
        return "bg-amber-950/40 border border-amber-800/80 text-amber-400";
    }
  };

  const formatFecha = (fechaStr: string | null) => {
    if (!fechaStr) return "--/--/----";
    const parts = fechaStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return fechaStr;
  };

  return (
    <div
      className={`${
        showFullWidth ? "lg:col-span-12" : "lg:col-span-8"
      } sm:col-span-12 overflow-hidden rounded-3xl bg-zinc-800 shadow-xl border border-zinc-700/30 flex flex-col`}
    >
      <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium text-white">Tareas del Equipo</h3>
          <p className="text-xs text-stone-400">Listado de tareas asignadas y estados actuales.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
            <FaSearch className="h-4 w-4 text-zinc-400" />
          </span>
          <input
            type="text"
            placeholder="Buscar tarea..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-zinc-700 hover:border-zinc-500 focus:border-sky-500 rounded-2xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all duration-200"
          />
        </div>
      </div>

      <div className="custom-table-container flex-grow overflow-x-auto">
        <table className="custom-table">
          <thead className="custom-table-thead">
            <tr>
              <th className="custom-table-th">ID</th>
              <th className="custom-table-th">Tarea</th>
              <th className="custom-table-th">Responsable</th>
              <th className="custom-table-th">Prioridad</th>
              <th className="custom-table-th">Estado</th>
              <th className="custom-table-th">Fecha Límite</th>
              <th className="custom-table-th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareasActuales.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400 text-sm">
                  No se encontraron tareas.
                </td>
              </tr>
            ) : (
              tareasActuales.map((t) => (
                <tr key={t.id_tarea} className="custom-table-tr text-stone-200">
                  <td className="font-semibold text-stone-400">#{t.id_tarea}</td>
                  <td>
                    <div className="flex flex-col text-left">
                      <span className="font-semibold text-white">{t.titulo}</span>
                      {t.descripcion && (
                        <span className="text-xs text-stone-400 line-clamp-1 mt-0.5" title={t.descripcion}>
                          {t.descripcion}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-xs text-stone-300 truncate max-w-[140px]" title={t.asignado_a || "Sin asignar"}>
                    {t.asignado_a || <span className="text-stone-500 italic">Sin asignar</span>}
                  </td>
                  <td>
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getPriorityClass(
                        t.prioridad
                      )}`}
                    >
                      {t.prioridad}
                    </span>
                  </td>
                  <td>
                    <select
                      value={t.estado || "pendiente"}
                      onChange={(e) => handleEstadoChange(t.id_tarea, e.target.value)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer transition-all duration-150 ${getStatusSelectClass(
                        t.estado
                      )}`}
                    >
                      <option value="pendiente" className="bg-neutral-900 text-amber-400 font-bold">Pendiente</option>
                      <option value="en_progreso" className="bg-neutral-900 text-blue-400 font-bold">En curso</option>
                      <option value="completada" className="bg-neutral-900 text-emerald-400 font-bold">Listo</option>
                      <option value="cancelada" className="bg-neutral-900 text-stone-400 font-bold">Cancelado</option>
                    </select>
                  </td>
                  <td className="text-sm font-mono text-stone-400">{formatFecha(t.fecha_limite)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showComments(t.id_tarea, t.titulo)}
                        title="Comentarios"
                        className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-sky-500 hover:text-sky-400 text-stone-400 transition-colors cursor-pointer"
                      >
                        <FiMessageSquare className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEliminarTarea(t.id_tarea, t.titulo)}
                        title="Eliminar Tarea"
                        className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-red-500 hover:text-red-400 text-stone-400 transition-colors cursor-pointer"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-zinc-800/50">
        <Pagination
          currentPage={paginaActual}
          totalPages={totalPaginas}
          onPageChange={setPaginaActual}
        />
      </div>
    </div>
  );
}
