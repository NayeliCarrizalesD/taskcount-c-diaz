"use client";

import React, { useState } from "react";
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
  const itemsPorPagina = 10;
  const totalPaginas = Math.ceil(initialChecador.length / itemsPorPagina);

  const entriesActuales = initialChecador.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  return (
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
          {entriesActuales.map((check) => (
            <tr className="custom-table-tr" key={check.id_entrada}>
              <td>{check.fecha_entrada_salida}</td>
              <td>{check.hora_entrada_salida}</td>
              <td>{check.checador}</td>
              <td>{check.nombre_empleado}</td>
              <td className="mx-2 my-2">
                <CopyButton hora={check.hora_entrada_salida} />
              </td>
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
  );
}
