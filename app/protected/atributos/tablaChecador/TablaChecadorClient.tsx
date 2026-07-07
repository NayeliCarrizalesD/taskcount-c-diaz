"use client";

import React, { useState, useMemo } from "react";
import CopyButton from "./copyButton";
import { Pagination } from "../../components/Pagination";

interface ChecadorEntry {
  id_entrada: number;
  fecha_entrada_salida: string;
  hora_entrada_salida: string;
  checador: string;
  nombre_empleado: string;
}

interface TablaChecadorClientProps {
  initialChecador: ChecadorEntry[];
}

export default function TablaChecadorClient({ initialChecador }: TablaChecadorClientProps) {
  const [paginaActual, setPaginaActual] = useState(1);
  const [selectedWorker, setSelectedWorker] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedDate, setSelectedDate] = useState("");
  
  const itemsPorPagina = 10;

  // Extraer la lista de trabajadores únicos
  const workers = useMemo(() => {
    const list = new Set<string>();
    initialChecador.forEach(item => {
      if (item.nombre_empleado) {
        list.add(item.nombre_empleado);
      }
    });
    return Array.from(list).sort();
  }, [initialChecador]);

  // Filtrar registros en base a los criterios seleccionados
  const filteredChecador = useMemo(() => {
    // Convertir selectedDate (format HTML: YYYY-MM-DD) al formato de base de datos (M/D/YYYY)
    let matchDateStr = "";
    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const month = parseInt(parts[1], 10).toString();
        const day = parseInt(parts[2], 10).toString();
        matchDateStr = `${month}/${day}/${year}`;
      }
    }

    return initialChecador.filter(item => {
      const matchWorker = selectedWorker === "Todos" || item.nombre_empleado === selectedWorker;
      const matchType = selectedType === "Todos" || item.checador.toLowerCase() === selectedType.toLowerCase();
      const matchDate = !matchDateStr || item.fecha_entrada_salida === matchDateStr;
      return matchWorker && matchType && matchDate;
    });
  }, [initialChecador, selectedWorker, selectedType, selectedDate]);

  const totalPaginas = Math.ceil(filteredChecador.length / itemsPorPagina);

  const entriesActuales = filteredChecador.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-2 bg-neutral-900/60 p-5 border border-zinc-700/60 rounded-3xl items-end">
        {/* Filtro por Trabajador (Solo si hay más de 1 trabajador) */}
        {workers.length > 1 && (
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
              Trabajador
            </label>
            <select
              value={selectedWorker}
              onChange={(e) => {
                setSelectedWorker(e.target.value);
                setPaginaActual(1);
              }}
              className="w-full px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
            >
              <option value="Todos">Todos los trabajadores</option>
              {workers.map((worker) => (
                <option key={worker} value={worker}>
                  {worker}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filtro por Entrada / Salida */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
            Entrada / Salida
          </label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPaginaActual(1);
            }}
            className="w-full px-3.5 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
          >
            <option value="Todos">Todas las acciones</option>
            <option value="Entrada">Entrada</option>
            <option value="Salida">Salida</option>
          </select>
        </div>

        {/* Filtro por Fecha */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">
            Fecha
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setPaginaActual(1);
            }}
            className="w-full px-3.5 py-2 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008fcb] focus:border-transparent text-sm cursor-pointer"
          />
        </div>

        {/* Botón para Limpiar */}
        <div className="flex">
          {(selectedWorker !== "Todos" || selectedType !== "Todos" || selectedDate !== "") && (
            <button
              onClick={() => {
                setSelectedWorker("Todos");
                setSelectedType("Todos");
                setSelectedDate("");
                setPaginaActual(1);
              }}
              className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-stone-300 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="custom-table-container">
        <table className="custom-table">
          <thead className="custom-table-thead">
            <tr>
              <th className="custom-table-th">Fecha</th>
              <th className="custom-table-th">Hora</th>
              <th className="custom-table-th">Entrada / Salida</th>
              <th className="custom-table-th">Nombre</th>
              <th className="custom-table-th">Copiar</th>
            </tr>
          </thead>
          <tbody>
            {entriesActuales.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 text-sm">
                  No se encontraron registros que coincidan con los filtros.
                </td>
              </tr>
            ) : (
              entriesActuales.map((check) => (
                <tr className="custom-table-tr" key={check.id_entrada}>
                  <td>{check.fecha_entrada_salida}</td>
                  <td>{check.hora_entrada_salida}</td>
                  <td>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      check.checador.toLowerCase() === 'entrada' 
                        ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' 
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {check.checador}
                    </span>
                  </td>
                  <td>{check.nombre_empleado}</td>
                  <td className="mx-2 my-2">
                    <CopyButton hora={check.hora_entrada_salida} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPaginas > 1 && (
          <div className="px-4 pb-2">
            <Pagination
              currentPage={paginaActual}
              totalPages={totalPaginas}
              onPageChange={setPaginaActual}
            />
          </div>
        )}
      </div>
    </div>
  );
}
