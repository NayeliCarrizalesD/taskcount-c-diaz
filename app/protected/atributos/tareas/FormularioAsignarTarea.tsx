"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiClipboard } from "react-icons/fi";

interface FormularioAsignarTareaProps {
  onTareaCreada: () => void;
}

export default function FormularioAsignarTarea({ onTareaCreada }: FormularioAsignarTareaProps) {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Campos del formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [asignadoA, setAsignadoA] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch("/api/usuarios");
        if (res.ok) {
          const data = await res.json();
          setUsuarios(data);
        }
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo requerido",
        text: "El título de la tarea es obligatorio",
        color: "white",
        background: "#0d0d0e",
      });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: titulo.trim(),
          descripcion: descripcion.trim() || null,
          prioridad,
          fecha_limite: fechaLimite || null,
          asignado_a: asignadoA || null,
        }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Creada!",
          text: "La tarea ha sido asignada correctamente.",
          timer: 2000,
          showConfirmButton: false,
          color: "white",
          background: "#0d0d0e",
          customClass: {
            popup: "rounded-3xl border border-zinc-800"
          }
        });

        // Reset
        setTitulo("");
        setDescripcion("");
        setPrioridad("media");
        setAsignadoA("");
        setFechaLimite("");

        onTareaCreada();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al crear la tarea");
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "No se pudo crear la tarea.",
        color: "white",
        background: "#0d0d0e",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-4 sm:col-span-12 overflow-hidden rounded-3xl bg-slate-800 shadow-xl p-6 border border-zinc-700/30">
      <div className="mb-4">
        <h3 className="flex items-center text-lg gap-2 font-medium text-white">
          <FiClipboard className="text-sky-400" /> Asignar Tarea
        </h3>
        <p className="text-xs text-stone-300 mt-1">
          Crea y asigna una tarea a un integrante del equipo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="task-titulo" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
            Título de la Tarea *
          </label>
          <input
            id="task-titulo"
            type="text"
            required
            placeholder="Ej. Revisar estados financieros"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
          />
        </div>

        <div>
          <label htmlFor="task-descripcion" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
            Descripción
          </label>
          <textarea
            id="task-descripcion"
            placeholder="Instrucciones adicionales de la tarea..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full px-3.5 py-2.5 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-prioridad" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
              Prioridad
            </label>
            <select
              id="task-prioridad"
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-fecha" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
              Fecha Límite
            </label>
            <input
              id="task-fecha"
              type="date"
              value={fechaLimite}
              onChange={(e) => setFechaLimite(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label htmlFor="task-asignado" className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1">
            Asignado a
          </label>
          <select
            id="task-asignado"
            value={asignadoA}
            onChange={(e) => setAsignadoA(e.target.value)}
            disabled={loadingUsers}
            className="w-full px-3 py-2.5 bg-neutral-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm cursor-pointer"
          >
            <option value="">{loadingUsers ? "Cargando..." : "Sin asignar"}</option>
            {usuarios.map((u) => (
              <option key={u.email} value={u.email}>
                {u.email}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full py-2.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 text-white transition-colors duration-150 text-sm disabled:bg-zinc-700 disabled:text-zinc-500 cursor-pointer shadow-lg shadow-sky-950/20"
        >
          {submitting ? "Asignando..." : "Asignar Tarea"}
        </button>
      </form>
    </div>
  );
}
